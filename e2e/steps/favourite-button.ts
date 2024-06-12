import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
/*
Scenario: Set pet as favourite
    Given I am in the homepage
    Given I log in as "user" with password "password"
    Then I'm logged in as user "user"
    And I go into the pets dropdown
    And I go into the pets list page
    And I go into one of the pets i haven't liked details
    When I click the "Favourite" button
    Then The pet is set as favourite
*/


Then('I am in the pet list page', () => {
    cy.visit('http://localhost:4200/pets-grid');
});

Then('I click the {string} dropdown', (option) => {
    cy.get('.dropdown-menu').contains(option).click();
  });

Then('I go into the pet {string} details', (option) => {
    cy.get('app-pet').contains(option).parent().contains("View details").click();
    //cy.visit('http://localhost:4200/pet-details/2');
});

Then('The pet is set as favourite', () => {
    cy.get('app-pet-favourite').contains("💔").should("exist")
});
Then('The pet is deleted as favourite', () => {
    cy.get('app-pet-favourite').contains("❤").should("exist")
});