import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";

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

console.log("Prepared Sites metadata and Cloudflare Worker entrypoint");
