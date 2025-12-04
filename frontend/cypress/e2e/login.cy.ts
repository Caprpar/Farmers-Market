/// <reference types="cypress" />
import "cypress-localstorage-commands";
describe("Player can log in, then reveals bet-board", () => {
  it("not showing bet-board when not logged in", () => {
    cy.visit("/");
    // is not logged in
    cy.setLocalStorage("auth_token", "");
    cy.getLocalStorage("auth_token").should("equal", "");
    cy.get('data-cy="bet-board"').should("not.be.visible");
  });

  it('data-cy="bet-board', () => {
    cy.get('data-cy="bet-board"').should("not.be.visible");
  });

  it('data-cy="username-input"', () => {
    cy.get('data-cy="username-input"');
  });

  it('data-cy="password-input', () => {
    cy.get('data-cy="password-input"');
  });

  it('data-cy="confirm-btn', () => {
    cy.get('data-cy="confirm-btn"');
  });

  it("reveal bet-board after login", () => {
    cy.visit("/");

    // is not logged in
    cy.setLocalStorage("auth_token", "");
    cy.getLocalStorage("auth_token").should("equal", "");

    cy.get('data-cy="bet-board"').should("not.be.visible");
    cy.get('data-cy="username-input"').type("Caprpar");
    cy.get('data-cy="password-input"').type("password123");
    cy.get('data-cy="confirm-btn"').click();
    cy.get('data-cy="bet-board"').should("be.visible");
  });
});
