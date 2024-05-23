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
Then('I\'m logged in as admin {string}', (username) => {
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
Then ('Shelter with phone number {string} is created', (phone) => {
    cy.get('#shelters').contains(phone);
});