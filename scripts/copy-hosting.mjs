import { copyFile, mkdir } from "node:fs/promises";

await mkdir("dist/.openai", { recursive: true });
await copyFile(".openai/hosting.json", "dist/.openai/hosting.json");
console.log("Copied Sites project metadata into dist/.openai/hosting.json");
