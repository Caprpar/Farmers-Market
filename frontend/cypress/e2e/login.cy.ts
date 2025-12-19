/// <reference types="cypress" />
import "cypress-localstorage-commands";
describe("Player can log in, then reveals bet-board", function () {
  it("Log in, start play", function () {
    cy.visit("/");

    cy.get('[data-cy="username-input"]').click();
    cy.get('[data-cy="username-input"]').type("caspar");
    cy.get('[data-cy="password-input"]').type("123");
    cy.get('[data-cy="confirm-btn"]').click();
    cy.get("#main button:nth-child(2)").click();
    cy.get("#main button.w-full").click();
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

  it('data-cy="username-input" exist', function () {
    cy.visit("/");
    cy.get('[data-cy="username-input"]');
  });

  it('data-cy="password-input exist', function () {
    cy.visit("/");
    cy.get('[data-cy="password-input"]');
  });

  it('data-cy="confirm-btn exist', function () {
    cy.visit("/");
    cy.get('[data-cy="confirm-btn"]');
  });

  it('data-cy="confirm-btn exist', function () {
    cy.visit("/");
    cy.get('[data-cy="toggle-btn"]');
  });

  it("login succeed with correct information", function () {
    cy.visit("/");

    cy.get('[data-cy="username-input"]').click();
    cy.get('[data-cy="username-input"]').type("caspar");
    cy.get('[data-cy="password-input"]').type("123");
    cy.get('[data-cy="confirm-btn"]').click();
    cy.get('[data-cy="login-redirect"]').should("contain.text", "Loggin in...");
  });

  it("login succeed with correct information", function () {
    cy.visit("/");

    cy.get('[data-cy="username-input"]').click();
    cy.get('[data-cy="username-input"]').type("caspar");
    cy.get('[data-cy="password-input"]').type("123");
    cy.get('[data-cy="confirm-btn"]').click();
    cy.get('[data-cy="login-redirect"]').should("contain.text", "Loggin in...");
  });
  it("Log in failed when typing missmatch password", function () {
    cy.visit("/");

    cy.get('[data-cy="username-input"]').click();
    cy.get('[data-cy="username-input"]').type("caspar");
    cy.get('[data-cy="password-input"]').type("321");
    cy.get('[data-cy="confirm-btn"]').click();
    cy.get('[data-cy="login-error"]').should(
      "contain.text",
      "Password and username does not match",
    );
  });
  it("reveal bet-board after login", function () {
    cy.visit("/");

    cy.get('[data-cy="username-input"]').click();
    cy.get('[data-cy="username-input"]').type("caspar");
    cy.get('[data-cy="password-input"]').type("123");
    cy.get('[data-cy="confirm-btn"]').click();
    cy.get('[data-cy="login-redirect"]').click();
    cy.get('[data-cy="bet-board"]').click();
  });
});
