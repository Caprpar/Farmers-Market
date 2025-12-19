import { defineConfig } from "cypress";
import registerLocalstorage from "cypress-localstorage-commands/plugin";
import codeCoverageTask from "@cypress/code-coverage/task";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      registerLocalstorage(on, config);
      codeCoverageTask(on, config);
      return config;
    },
    baseUrl: "http://localhost:5173/",
    supportFile: "cypress/support/e2e.ts",
  },

  component: {
    devServer: {
      framework: "svelte",
      bundler: "vite",
    },
  },
});
