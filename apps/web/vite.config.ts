import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      "@repo/ui": path.resolve(__dirname, "../../packages/ui/src"),
    },
  },
  css: {
    postcss: path.resolve(__dirname, "./postcss.config.mjs"),
  },
});
