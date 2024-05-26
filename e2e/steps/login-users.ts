import { Given} from 'cypress-cucumber-preprocessor/steps';

Given('There is a registered user with username {string} and password {string}',  (username, password) => {
    var email = username+"@sample.app"
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/users',
      body: {
        username,
        email,
        password
      },
      failOnStatusCode: false 
    });
  });