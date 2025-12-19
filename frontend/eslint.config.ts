import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["**/*.js", "**/*.d.ts"],
  },
  {
    extends: ["js/recommended"],
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: { globals: globals.node },
    plugins: { js },
  },
  tseslint.configs.recommended,
]);
