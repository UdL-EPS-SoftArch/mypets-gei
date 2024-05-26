Feature: Login User
  In order to use the app
  As a user
  I want to login myself with an account


  Scenario: Login existing user
    Given I'm in the homepage
    Given There is a registered user with username "user" and password "password"
    And I'm not logged in
    When I click the "Login" menu
    And I fill the form with
      | FIELD    | VALUE         |
      | username | user          |
      | password | password      |
    And I click the "Submit" button
    Then I'm logged in as user "user"

  Scenario: Login with not existing username
    Given I'm in the homepage
    Given There is a registered user with username "user" and password "password"
    And I'm not logged in
    When I click the "Login" menu
    And I fill the form with
      | FIELD    | VALUE         |
      | username | no_user       |
      | password | password      |
    And I click the "Submit" button
    Then I see error message "Username or password incorrect"

  Scenario: Login with incorrect password
    Given I'm in the homepage
    Given There is a registered user with username "user" and password "password"
    And I'm not logged in
    When I click the "Login" menu
    And I fill the form with
      | FIELD    | VALUE         |
      | username | user          |
      | password | no_password   |
    And I click the "Submit" button
    Then I see error message "Username or password incorrect"

  Scenario: Login user when already authenticated
    Given I'm in the homepage
    Given There is a registered user with username "user" and password "password"
    And I log in as "user" with password "password"
    Then The "Login" menu is not present

  Scenario: Login user with empty password
    Given I'm in the homepage
    Given There is a registered user with username "user" and password "password"
    And I'm not logged in
    When I click the "Login" menu
    And I fill the form with
      | FIELD    | VALUE         |
      | username | user          |
    Then The "Submit" button is disabled


  Scenario: Login user with empty username
    Given I'm in the homepage
    Given There is a registered user with username "user" and password "password"
    And I'm not logged in
    When I click the "Login" menu
    And I fill the form with
      | FIELD    | VALUE         |
      | password | password      |
    Then The "Submit" button is disabled
    
  Scenario: Login user with password shorter than 8 characters
    Given I'm in the homepage
    Given There is a registered user with username "user" and password "password"
    And I'm not logged in
    When I click the "Login" menu
    And I fill the form with
      | FIELD    | VALUE         |
      | username | user          |
      | password | pass          |
    Then The "Submit" button is disabled
