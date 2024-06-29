import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I am in the homepage', () => {
    cy.visit('http://localhost:4200');
});

Given('I log in as {string} with password {string}', (username, password) => {
    cy.get('.nav-link').contains('Login').click();
    cy.get('#username').type(username).blur();
    cy.get('#password').type(password).blur();
    cy.get('button').contains('Submit').click();
});

Given('I am logged in as user {string}', (username) => {
    cy.get('#currentUser')
        .invoke('text')
        .should('contains', username);
});

Given('I navigate to the delete confirmation page for pet with ID {string}', (petId) => {
    cy.visit(`http://localhost:4200/pet-details/${petId}/delete`);
});

When('I click the {string} button', (label) => {
    cy.contains('button', label).click();
});

When('I click the "Delete" button on the delete confirmation page', () => {
    cy.get('#deleteBtn').click(); // Adjust selector based on actual button ID or class
});

When('I confirm deletion on the delete confirmation page', () => {
    cy.get('#deleteBtn').click(); // Adjust selector based on actual button ID or class
    // Assuming a confirmation dialog or action confirmation process
    // Use cy.on('window:confirm', () => true); if necessary
});

When('I click the "Cancel" button', () => {
    cy.get('#cancelBtn').click(); // Adjust selector based on actual button ID or class
});

Then('I am redirected to pets grid page', () => {
    cy.url().should('include', '/pets-grid');
});

Then('I do not see the pet with name {string}', (petName) => {
    cy.contains('.pet-name', petName).should('not.exist');
});
