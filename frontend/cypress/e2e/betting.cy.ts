//Play 4x sessions always betting 20%, betamount should never show negative
import "cypress-localstorage-commands";
describe("Interacting with betting board", () => {
  it("Play 4x sessions always betting 20%, current-bet should never show negative", () => {
    cy.visit("/");
    // is logged in
    cy.setLocalStorage("auth_token", "1234");
    cy.getLocalStorage("auth_token").should("equal", "1234");
    cy.get('[data-cy="bet-20"]').click();
    cy.get('[data-cy="play-btn"]').click();
    cy.get('[data-cy="bet-20"]').click();
    cy.get('[data-cy="play-btn"]').click();
    cy.get('[data-cy="bet-20"]').click();
    cy.get('[data-cy="play-btn"]').click();
    cy.get('[data-cy="bet-20"]').click();
    cy.get('[data-cy="play-btn"]').click();
    cy.get('[data-cy="current-bet"]').should("be.above", 0);
  });
});
