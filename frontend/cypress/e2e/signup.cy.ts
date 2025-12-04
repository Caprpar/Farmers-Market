/// <reference types="cypress" />
import "cypress-localstorage-commands";

describe("Player can sign up, then reveals bet-board", () => {
  it("not showing bet-board when not logged in", () => {
    cy.visit("/");
    // is not logged in
    cy.setLocalStorage("auth_token", "");
    cy.getLocalStorage("auth_token").should("equal", "");
    cy.get('data-cy="bet-board"').should("not.be.visible");
  });

  it('data-cy="bet-board" should not exist when not logged it', () => {
    cy.visit("/");
    cy.setLocalStorage("auth_token", "");
    cy.getLocalStorage("auth_token").should("equal", "");
    cy.get('data-cy="bet-board"').should("not.be.visible");
  });

  it('data-cy="signup-btn" exist', () => {
    cy.visit("/");
    cy.get('data-cy="signup-btn"');
  });

  it('data-cy="username-input" exist"', () => {
    cy.visit("/");
    cy.get('data-cy="username-input"');
  });

  it('data-cy="password-input" exist"', () => {
    cy.visit("/");
    cy.get('data-cy="password-input"');
  });

  it('data-cy="confirm-password-input" exist', () => {
    cy.visit("/");
    cy.get('data-cy="confirm-password-input"');
  });

  it('data-cy="confirm-btn" exist', () => {
    cy.visit("/");
    cy.get('data-cy="confirm-btn"');
  });

  it("reveal bet-board after signup exist", () => {
    cy.visit("/");

    // is not logged in
    cy.setLocalStorage("auth_token", "");
    cy.getLocalStorage("auth_token").should("equal", "");

    cy.get('data-cy="bet-board"').should("not.be.visible");
    cy.get('data-cy="username-input"').type("Caprpar");
    cy.get('data-cy="password-input"').type("password123");
    cy.get('data-cy="confirm-password-input"').type("password123");
    cy.get('data-cy="confirm-btn"').click();
    cy.get('data-cy="bet-board"').should("be.visible");
  });

  it("Displays error when password not match", () => {
    cy.visit("/");
    cy.get('data-cy="username-input"').type("Caprpar");
    cy.get('data-cy="password-input"').type("password123");
    cy.get('data-cy="confirm-password-input"').type("password423");
    cy.get('data-cy="confirm-btn"').click();
    cy.get('data-cy="password-error"').should(
      "have.text",
      "password does not match",
    );
  });
});
