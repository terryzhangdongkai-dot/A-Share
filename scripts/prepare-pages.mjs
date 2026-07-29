import { copyFile, writeFile } from "node:fs/promises";

await copyFile("docs/index.html", "docs/404.html");
await writeFile("docs/.nojekyll", "");
console.log("Prepared GitHub Pages fallback and .nojekyll");
