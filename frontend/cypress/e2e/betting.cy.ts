//Play 4x sessions always betting 20%, betamount should never show negative
import "cypress-localstorage-commands";

describe("Interacting with betting board", function () {
  it("Log in, play 4x sessions always betting 20%, current-bet should never show negative", function () {
    cy.visit("/");

    cy.get('[data-cy="username-input"]').click();
    cy.get('[data-cy="username-input"]').type("caspar");
    cy.get('[data-cy="password-input"]').type("123");
    cy.get('[data-cy="confirm-btn"]').click();
    cy.get("#main button:nth-child(1)").click();
    cy.get("#main button.w-full").click();
    cy.get("#main button:nth-child(1)").click();
    cy.get("#main button.w-full").click();
    cy.get("#main button:nth-child(1)").click();
    cy.get("#main button.w-full").click();
    cy.get("#main button:nth-child(1)").click();
    cy.get("#main button.w-full").click();
    cy.get("#current_bet")
      .invoke("val")
      .then((v) => Number(v))
      .should("be.at.least", 0);
  });

  it("Log in, start play", function () {
    cy.visit("/");

    cy.get('[data-cy="username-input"]').click();
    cy.get('[data-cy="username-input"]').type("caspar");
    cy.get('[data-cy="password-input"]').type("123");
    cy.get('[data-cy="confirm-btn"]').click();
    cy.get('[data-cy="20-btn"]').click();
    cy.get('[data-cy="play-btn"]').click();
  });

  it("pressing 20 and 50 disables 80", function () {
    cy.visit("/");

    cy.get('[data-cy="username-input"]').click();
    cy.get('[data-cy="username-input"]').type("caspar");
    cy.get('[data-cy="password-input"]').type("123");
    cy.get('[data-cy="confirm-btn"]').click();

    cy.get('[data-cy="20-btn"]').click();
    cy.get('[data-cy="50-btn"]').click();
    cy.get('[data-cy="80-btn"]').should("have.attr", "disabled");
  });

  it("pressing 80 disables 50", function () {
    cy.visit("/");

    cy.get('[data-cy="username-input"]').click();
    cy.get('[data-cy="username-input"]').type("caspar");
    cy.get('[data-cy="password-input"]').type("123");
    cy.get('[data-cy="confirm-btn"]').click();

    cy.get('[data-cy="80-btn"]').click();
    cy.get('[data-cy="50-btn"]').should("have.attr", "disabled");
  });
});
