/// <reference types="cypress" />
import "cypress-localstorage-commands";

describe("Player can sign up, then reveals bet-board", function () {
  it('data-cy="bet-board" should not exist when not logged it', function () {
    cy.visit("/");

    cy.get('#app a[href="#/play"]').click();
    cy.get('[data-cy="login-information"]').click();
    cy.get('[data-cy="login-information"]').should(
      "contain.text",
      "Please login to play",
    );
  });

  it('data-cy="toggle-btn" exist and toggles to login', function () {
    cy.visit("/");
    cy.get('[data-cy="toggle-btn"]').should("contain.text", "Sign up");
    cy.get('[data-cy="toggle-btn"]').click();
    cy.get('[data-cy="toggle-btn"]').should("contain.text", "Log in");
  });

  it('data-cy="username-input" exist"', function () {
    cy.visit("/");
    cy.get('[data-cy="username-input"]');
  });

  it('data-cy="password-input" exist"', function () {
    cy.visit("/");
    cy.get('[data-cy="password-input"]');
  });

  it('data-cy="confirm-password-input" exist', function () {
    cy.visit("/");
    cy.get('[data-cy="toggle-btn"]').click();
    cy.get('[data-cy="confirm-password-input"]').should("exist");
  });

  it('data-cy="confirm-btn" exist', function () {
    cy.visit("/");
    cy.get('[data-cy="confirm-btn"]');
  });

  it("Displays error when password not match", function () {
    cy.visit("/");
    cy.get('[data-cy="toggle-btn"]').click();
    cy.get('[data-cy="username-input"]').type("Caprpar");
    cy.get('[data-cy="password-input"]').type("password123");
    cy.get('[data-cy="confirm-password-input"]').type("password423");
    cy.get('[data-cy="confirm-btn"]').click();
    cy.get('[data-cy="login-error"]').should(
      "have.text",
      "password does not match",
    );
  });

  it("Show error when password not matching", function () {
    cy.visit("/");

    cy.get('[data-cy="toggle-btn"]').click();
    cy.get('[data-cy="username-input"]').click();
    cy.get('[data-cy="username-input"]').type("rapsac");
    cy.get('[data-cy="password-input"]').type("321");
    cy.get('[data-cy="confirm-password-input"]').type("123");
    cy.get('[data-cy="confirm-btn"]').click();
    cy.get('[data-cy="login-error"]').should(
      "contain.text",
      "password does not match",
    );
  });
});
