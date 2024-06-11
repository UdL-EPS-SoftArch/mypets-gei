
import { Given, When, Then,And } from 'cypress-cucumber-preprocessor/steps';
import { DataTable } from '@cucumber/cucumber';

Given('I am not logged in', () => {
    cy.get('.nav-link').contains('Login');
});
And('There is a created shelter with name {string} and email {string} and mobile {string}', (username, email, mobile) => {
    cy.request('POST', 'http://localhost:8080/shelters', {username, email,mobile})
});
Given('I am in the homepage', () => {
    cy.visit('http://localhost:4200');
});
Given('I log in as {string} with password {string}', (username, password) => {
    cy.get('.nav-link').contains('Login').click();
    cy.get('#username').type(username).blur();
    cy.get('#password').type(password).blur();
    cy.get('button').contains('Submit').click();
});
Given ('I am in shelters page', () => {
    cy.visit('http://localhost:4200/shelters');
});
Then('I am logged in as user {string}', (username) => {
    cy.get('#currentUser')
      .invoke('text')
      .should('contains', username);
});
When('I click the last {string} button', (label) => {
    cy.get('button').contains(label).last().click();
});
Then('I do not see {string}', (label) => {
    cy.contains(label).should('not.exist');
});
Then('I do not see shelter', (phone) => {
    cy.contains('p.text-center','No shelters').should('be.visible');
});
Then('I do not see the shelter with name {string}', (name) => {
  cy.contains('.shelter-name',name).should('not.exist');
});
When('I click the {string} button', (label) => {
    cy.get('button').contains(label).click();
});
When('I fill the form with', (table: DataTable) => {
    table.rows().forEach((pair: string[]) =>
      cy.get('#' + pair[0]).type(pair[1]).blur() );
 });
Given ('I am in delete shelter page', () => {
    cy.visit('http://localhost:4200/shelters');
});
Then ('I do not see {string} button', (label) => {
    cy.contains(label).should('not.exist');
});
