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

Given('There is a registered volunteer with name {string} and password {string} and email {string}', (username, password, email) => {
  cy.request('POST', 'http://localhost:8080/users', {username, password, email, role: 'volunteer'});
});

Given('I am in pets page', () => {
  cy.visit('http://localhost:4200/pets-grid');
});

When('I click the {string} button', (label) => {
  cy.get('button').contains(label).click();
});

When('I fill the form with', (table: DataTable) => {
  table.rows().forEach((pair: string[]) =>
    cy.get('#' + pair[0]).type(pair[1]).blur());
});

Then('Pet with name {string} is created', (name) => {
  cy.get('div.card.mb-1').then($pets => {
    cy.wrap($pets).each(($pet, index) => {
      cy.log(`Pet ${index + 1}: ${$pet.text()}`);
    });

    cy.get('div.card.mb-1').contains(name).should('exist');
  });
});

Then('I see input field feedback message {string}', (message) => {
  cy.get('.invalid-feedback')
    .should('be.visible')
    .invoke('text')
    .should('contains', message);
});

// Commented out as the functionality for invalid image link is not implemented yet
// Then('I see an error message {string}', (message) => {
//   cy.get('.invalid-feedback')
//     .should('be.visible')
//     .invoke('text')
//     .should('contains', message);
// });
