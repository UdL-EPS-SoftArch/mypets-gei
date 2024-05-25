import { Given} from 'cypress-cucumber-preprocessor/steps';

Given('There is a registered user with username {string} and password {string}',  (username, password) => {
    cy.visit('http://localhost:4200');
    cy.get('.nav-link').contains('Register').click();
    cy.get('#username').type(username).blur();
    cy.get('#email').type(username+"@sample.app").blur();
    cy.get('#password').type(password).blur();
    cy.get('button').contains('Submit').click();
  });