import {
  copyFile,
  mkdir,
  readFile,
  readdir,
  rename,
  writeFile,
} from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

await mkdir("dist/.openai", { recursive: true });
await copyFile(".openai/hosting.json", "dist/.openai/hosting.json");

const workerPath = "dist/server/index.js";
const workerSource = await readFile(workerPath, "utf8");
const defaultHandlerExport = "export {\n  handler as default\n};";
if (!workerSource.includes(defaultHandlerExport)) {
  throw new Error("Could not find vinext's default handler export.");
}
await writeFile(
  workerPath,
  workerSource.replace(
    defaultHandlerExport,
    "export default { fetch: handler };",
  ),
);

const pnpmPackages = await readdir("node_modules/.pnpm");
const esbuildPackage = pnpmPackages.find((name) => name.startsWith("esbuild@"));
if (!esbuildPackage) {
  throw new Error("Could not locate esbuild in pnpm's dependency store.");
}
const esbuildPath = resolve(
  "node_modules/.pnpm",
  esbuildPackage,
  "node_modules/esbuild/lib/main.js",
);
const { build } = await import(pathToFileURL(esbuildPath));
const bundledWorkerPath = "dist/server/worker-bundled.js";
await build({
  entryPoints: [workerPath],
  bundle: true,
  format: "esm",
  platform: "browser",
  conditions: ["worker", "browser"],
  external: ["node:*"],
  outfile: bundledWorkerPath,
});
await rename(bundledWorkerPath, workerPath);

console.log("Prepared Sites metadata and self-contained Worker entrypoint");
