import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { resolve } from "node:path";

export default defineConfig({
  // O nome deve corresponder ao repositório do GitHub.
  // Para este projeto: https://malu-git-11.github.io/ONG-Esperanca/
  base: "/ONG-Esperanca/",
  plugins: [
    createHtmlPlugin({
      minify: true
    })
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: "esbuild",
    cssMinify: true,
    sourcemap: false,
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        projetos: resolve(__dirname, "projetos.html"),
        cadastro: resolve(__dirname, "cadastro.html")
      }
    }
  }
});
