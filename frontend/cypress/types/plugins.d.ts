/// <reference types="cypress" />

declare module "cypress-localstorage-commands/plugin" {
  const plugin: (
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions,
  ) => void;

  export default plugin;
}

declare module "@cypress/code-coverage/task" {
  const task: (
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions,
  ) => Cypress.PluginConfigOptions | void;

  export default task;
}
declare module "@cypress/code-coverage/support";

