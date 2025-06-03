/// <reference types="vitest" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

import { dependencies } from "./package.json";

// https://vite.dev/config/
export default defineConfig({
  define: { __LIBXSLT_WASM_VERSION__: `"${dependencies["libxslt-wasm"]}"` },
  plugins: [react(), tailwindcss()],
  css: { transformer: "lightningcss" },
  esbuild: {
    supported: {
      "top-level-await": true, // https://emscripten.org/docs/tools_reference/settings_reference.html#modularize
    },
  },
  worker: { format: "es" },
  optimizeDeps: { exclude: ["libxslt-wasm"] },
  build: {
    target: ["es2022", "edge89", "firefox89", "chrome89", "safari15"],
    cssMinify: "lightningcss",
  },
});
