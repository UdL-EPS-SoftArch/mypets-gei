import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { DataTable } from '@cucumber/cucumber';

Given('I\'m in the homepage', () => {
  cy.visit('http://localhost:4200');
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
  
Given('There is a registered admin with name {string} and password {string} and email {string}', (username, password, email) => {
    cy.request('POST', 'http://localhost:8080/users', {username, password, email, role: 'admin'});

});
When('I fill the form with', (table: DataTable) => {
    table.rows().forEach((pair: string[]) =>
      cy.get('#' + pair[0]).type(pair[1]).blur() );
 });
When('I click the {string} button', (label) => {
    cy.get('button').contains(label).click();
});
Given ('I am in shelters page', () => {
    cy.visit('http://localhost:4200/shelters');
});
Then ('I don\'t see {string} button', (label) => {
    cy.get('button').contains(label).should('not.exist');
});
Then('Shelter with phone number {string} is created', (phone) => {
    // List all available shelters
    cy.get('div.card.mb-1').then($shelters => {
        // Log all the shelters to the console
        cy.wrap($shelters).each(($shelter, index) => {
            cy.log(`Shelter ${index + 1}: ${$shelter.text()}`);
        });

        // Verify if the shelter with the given phone number exists
        cy.get('div.card.mb-1').contains(phone).should('exist');
    });
});

Then('I see input field feedback message {string}', (message) => {
    cy.get('.invalid-feedback')
      .should('be.visible')
      .invoke('text')
      .should('contains', message);
});
Then('The {string} button is disabled', (label) => {
    cy.get('button').contains(label)
    .should('be.disabled');
});