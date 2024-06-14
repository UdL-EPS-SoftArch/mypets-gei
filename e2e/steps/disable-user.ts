import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given("I'm in the homepage", () => {
  cy.visit('/');
});

Given("I'm logged in as {string}", (username, password) => {
    cy.get('#currentUser')
    .invoke('text')
    .should('contains', username);
});

Given('I am on the {string} page', (page) => {
  cy.visit(`http://localhost:4200/${page.toLowerCase()}`);
});

Then('I should see a list of users', () => {
  cy.get('.user-list').should('be.visible');
});
