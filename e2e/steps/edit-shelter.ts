import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import { DataTable } from '@cucumber/cucumber'

Given("I'm in the homepage", () => {
  cy.visit('http://localhost:4200')
})

Given("I'm in the shelters list page", () => {
  cy.visit('http://localhost:4200/shelters')
})

Given("I'm not logged in", () => {
  cy.get('.nav-link').contains('Login')
})

Given('I log in as {string} with password {string}', (username, password) => {
  cy.get('.nav-link').contains('Login').click()
  cy.get('#username').type(username).blur()
  cy.get('#password').type(password).blur()
  cy.get('button').contains('Submit').click()
  cy.get('.nav-link').contains(username)
})

Given('I click the {string} menu', (option) => {
  cy.get('.nav-link').contains(option).click()
})

Given('I click the {string} button', (label) => {
  cy.get('button').contains(label).click()
})

Given(
  'I click the {string} button of Shelter with phone number {string}',
  (label, phone) => {
    cy.get('div.card.mb-1:contains(' + phone + ')')
      .closest('.card.mb-1')
      .find('button:contains(' + label + ')')
      .click()
  },
)

When('I fill the form with', (table: DataTable) => {
  table.rows().forEach((pair: string[]) => {
    const element = cy.get('#' + pair[0]).clear()
    if (pair[1].length > 0) {
      element.type(pair[1])
    }
    element.blur()
  })
})

Then('I see input field feedback message {string}', (message) => {
  cy.get('.invalid-feedback')
    .should('be.visible', { timeout: 10000 })
    .invoke('text')
    .should('contains', message)
})

Then('The button {string} is not present', (label) => {
  cy.get('button').contains(label).should('not.exist')
})

Then('The {string} button is disabled', (label) => {
  cy.get('button').contains(label).should('be.disabled')
})

Then('Shelter with phone number {string} is created', (phone) => {
  cy.get('div.card.mb-1').contains(phone).should('exist')
})

Then('Shelter with name {string} is updated', (name) => {
  cy.get('div.card.mb-1').contains(name).should('exist')
})
