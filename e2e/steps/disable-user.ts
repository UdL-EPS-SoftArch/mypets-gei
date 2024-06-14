import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given("I'm in the homepage", () => {
  cy.visit('/');
});

Given('I log in as {string} with password {string}', (username, password) => {
    cy.get('.nav-link').contains('Login').click();
    cy.get('#username').type(username).blur();
    cy.get('#password').type(password).blur();
    cy.get('button').contains('Submit').click();
  });

  
  Then('I\'m logged in as user {string}', (username) => {
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

Then('I click on the {string} text', (text) => {
    cy.contains('a', text).click();
  });
  
  When('I click on "Disable" button', () => {
    cy.get('button').contains("Disable").should('be.enabled').click();
  });

  Then('I click on the "Disable" button', (username) => {
    cy.get('button').contains("Disable").click();
  });
  
  Then('I should see a message {string}', (message) => {
    cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal(message);
      });
  });
  
