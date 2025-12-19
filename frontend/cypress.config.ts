import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-localstorage-commands/plugin")(on, config);
      require("@cypress/code-coverage/task")(on, config);
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
