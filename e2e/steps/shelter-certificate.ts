import { And, Given, Then } from "cypress-cucumber-preprocessor/steps";


Then('I can view the list of shelter certificates', () => {
    cy.get('app-certificate-validate').should('exist')
})

And('I fill the certificate date with a valid one', () => {
    cy.get('#certificateExpirationDate').type('2099-01-01')
})

Then('The popup closes', () => {
    cy.get('ngb-modal.window').should('not.exist')
})

And('The first shelter certificate is {string}', (status) => {
    cy.get('#status').contains(status)
})