import { And, Given, When} from 'cypress-cucumber-preprocessor/steps';

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
  cy.contains('.card-body','shelter1@sample.app')
  .within(() => {
      // Step 3: Click the edit button within that div
      cy.get('button').contains('Edit').click();
    });


});


When('I click the {string} button from the volunteer {string}', (button, volunteer) => {
  cy.contains('.card-body',volunteer)
  .within(() => {
      // Step 3: Click the edit button within that div
      cy.get('button').contains(button).click();
    });

});

