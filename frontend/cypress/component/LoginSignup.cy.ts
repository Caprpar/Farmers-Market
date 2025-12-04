import { mount } from "cypress/svelte";
import LoginForm from "../../src/lib/LoginForm.svelte";

describe("LoginForm.cy.ts", () => {
  it('data-cy="signup-btn" exist', () => {
    mount(LoginForm);
    cy.get('data-cy="confirm-btn"');
  });

  it('data-cy="username-input" exist"', () => {
    mount(LoginForm);
    cy.get('data-cy="username-input"');
  });

  it('data-cy="password-input" exist"', () => {
    mount(LoginForm);
    cy.get('data-cy="password-input"');
  });

  it('data-cy="confirm-btn" exist', () => {
    mount(LoginForm);
    cy.get('data-cy="confirm-btn"');
  });

  it('data-cy="confirm-password-input" only exist when signup', () => {
    mount(LoginForm, { props: { signUpForm: true } });
    cy.get('data-cy="confirm-password-input"').should("exist");
    mount(LoginForm, { props: { signUpForm: false } });
    cy.get('data-cy="confirm-password-input"').should("not.exist");
  });

  it('data-cy="confirm-password-input" exist when pressed signup', () => {
    mount(LoginForm, { props: { signUpForm: false } });
    cy.get('data-cy="signup-btn"').click();
    cy.get('data-cy="confirm-password-input"').should("exist");
  });

  it("Displays error when password not match", () => {
    mount(LoginForm, { props: { signUpForm: true } });
    cy.get('data-cy="username-input"').type("Caprpar");
    cy.get('data-cy="password-input"').type("password123");
    cy.get('data-cy="confirm-password-input"').type("password423");
    cy.get('data-cy="confirm-btn"').click();
    cy.get('data-cy="login-error"').should(
      "have.text",
      "password does not match",
    );
  });

  it("When entering username that does not exist in database show error 'User or password is incorrect!' ", () => {
    mount(LoginForm, { props: { signUpForm: true } });
    cy.intercept("GET", "/api/players", {
      body: {
        players: [
          {
            name: "Caspar",
          },
          {
            name: "Felix",
          },
          {
            name: "Hampus",
          },
          {
            name: "Ingo",
          },
        ],
      },
    }).as("getAllPlayers");
    cy.wait("@getAllPlayers");
    cy.get('data-cy="username-input"').type("Caprpar");
    cy.get('data-cy="password-input"').type("password123");
    cy.get('data-cy="login-error"').should(
      "have.text",
      "User or password is incorrect!",
    );
  });
});
