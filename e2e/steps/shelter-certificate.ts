import { Given, Then } from "cypress-cucumber-preprocessor/steps";


Then('I can view the list of shelter certificates', () => {
    cy.get('app-certificate-validate').should('exist')
})