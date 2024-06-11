import { And, Given, Then, When} from 'cypress-cucumber-preprocessor/steps';

Given('There is a registered volunteer with username {string} and password {string} in shelter {string}',  (username, password,shelterId) => {
    var email = username+"@sample.app"
       cy.request({
      method: 'POST',
      url: 'http://localhost:8080/shelterVolunteers',
      body: {
        username,
        email,
        password,
        shelter: shelterId
      },
      failOnStatusCode: false 
    });
  });

Given ('I am in shelters {string} edit page', (shelter) => {
  cy.visit('http://localhost:4200/shelters');
  cy.contains('.card-body',shelter+'@dbsample.app')
  .within(() => {
      // Step 3: Click the edit button within that div
      cy.get('button').contains('Edit').click();
    });


});

And('Refresh',()=> {
  cy.reload()
  //cy.intercept('GET', '**/shelterVolunteers/**').as('getVolunteers');
  //cy.wait('@getVolunteers').its('response.statusCode').should('eq', 200);

});
When('I click the {string} button from the volunteer {string}', (button, volunteer) => {
  cy.contains('.card-body',volunteer)
  .within(() => {
      // Step 3: Click the edit button within that div
      cy.get('button').contains(button).click();
    });

});
And('I click the Kick button', (button) => {
  cy.intercept('DELETE', '**/shelterVolunteers/*').as('deleteVolunteer');
  cy.get('button').contains('Kick').click();
  cy.wait('@deleteVolunteer').its('response.statusCode');
});

And('I do not see the {string} button from the volunteer {string}', (button, volunteer) => {
  cy.contains('.card-body',volunteer)
  .within(() => {
      // Step 3: Click the edit button within that div
      cy.get('button').contains(button).should('not.exist');;
    });

});
Then('I see error message {string}', (error_msg) => {

  cy.contains('app-error-alert',error_msg)
});
And('I go to kick volunteer {string}', () => {
  cy.visit('http://localhost:4200/shelters/kick/volunteer3')
});