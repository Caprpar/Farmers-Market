import { mount } from "cypress/svelte";
import Highscore from "../../src/lib/Highscore.svelte";
describe("Highscore.cy.ts", () => {
  cy.intercept("GET", "/api/Highscore", {
    body: {
      players: [
        {
          name: "Caspar",
          score: 4000,
        },
        {
          name: "Felix",
          score: 3000,
        },
        {
          name: "Hampus",
          score: 2000,
        },
        {
          name: "Ingo",
          score: 1000,
        },
      ],
    },
  }).as("getHighscore");

  it("Displays user score 1 if Caspar", () => {
    mount(Highscore, { props: { currentUser: "Caspar" } });
    cy.wait("@getAllPlayers");
    cy.get('data-cy="scoreboard"').should("contain.text", "1");
  });

  it("Displays user score 4 if Ingo", () => {
    mount(Highscore, { props: { currentUser: "Ingo" } });
    cy.wait("@getAllPlayers");
    cy.get('data-cy="scoreboard"').should("contain.text", "4");
  });

  it("renders a table with 4 rows, containing the right data", () => {
    mount(Highscore);
    cy.get('[data-cy="name-1"]').should("contain.text", "Caspar");
    cy.get('[data-cy="score-1"]').should("contain.text", "4000");
    cy.get('[data-cy="name-2"]').should("contain.text", "Felix");
    cy.get('[data-cy="score-2"]').should("contain.text", "3000");
    cy.get('[data-cy="name-3"]').should("contain.text", "Hampus");
    cy.get('[data-cy="score-3"]').should("contain.text", "2000");
    cy.get('[data-cy="name-4"]').should("contain.text", "Ingo");
    cy.get('[data-cy="score-4"]').should("contain.text", "1000");
    cy.get('[data-cy="close-btn"]').should("exist");
  });
});
