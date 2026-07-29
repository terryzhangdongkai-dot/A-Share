import { defineConfig } from "vite";

export default defineConfig({
  root: "static",
  base: "./",
  build: {
    outDir: "../docs",
    emptyOutDir: true,
  },
});
