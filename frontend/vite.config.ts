import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
// import IstanbulPlugin from "vite-plugin-istanbul";

import * as mod from "vite-plugin-istanbul";

const IstanbulPlugin = (mod as any).default ?? (mod as any);
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    tailwindcss(),
    IstanbulPlugin({
      cypress: true,
      requireEnv: true,
      include: "src/**/*",
      exclude: [
        "node_modules",
        "cypress",
        "dist",
        "**/*.test.*",
        "**/*.spec.*",
      ],
      extension: [".js", ".ts", ".tsx", ".svelte"],
    }),
  ],
});
