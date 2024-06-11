Feature: Edit Shelter
  In order to use the app
  As a Shelter Volunteer or admin
  I want to edit the data of the Shelters

  Scenario: Create Mock Shelters
    Given I'm in the homepage
    And I'm logged in as "admin" with password "password"
    And I click the "Shelters" menu
    When I click the "Create new Shelter" button
    And I fill the form with
      | FIELD    | VALUE                |
      | name     | EditShelter          |
      | email    | editShelter@demo.app |
      | mobile   | 1                    |
    And I click the "Submit" button
    And I click the "Create new Shelter" button
    And I fill the form with
      | FIELD    | VALUE                 |
      | name     | EditShelter2          |
      | email    | editShelter2@demo.app |
      | mobile   | 2                     |
    And I click the "Submit" button
    Then Shelter with email "editShelter@demo.app" is created
    And Shelter with email "editShelter2@demo.app" is created


  Scenario: Edit Shelter not logged in
    Given I'm in the homepage
    And I'm not logged in
    And I click the "Shelters" menu
    Then The button "Edit" is not present

  Scenario: Edit Shelter as User
    Given I'm in the homepage
    And I'm logged in as "demo" with password "password"
    And I click the "Shelters" menu
    Then The button "Edit" is not present

  Scenario: Edit Shelter as Volunteer
    Given I'm in the homepage
    And I'm logged in as "volunteer" with password "password"
    And I click the "Shelters" menu
    When I click the "Edit" button of Shelter with email "editShelter@demo.app"
    And I wait for the spinner to disappear
    And I fill the shelter form with
      | FIELD    | VALUE                |
      | name     | editVolunteerShelter |
    And I click the "Submit" button
    Then Shelter with name "editVolunteerShelter" is updated

  Scenario: Edit Shelter as admin
    Given I'm in the homepage
    And I'm logged in as "admin" with password "password"
    And I click the "Shelters" menu
    When I click the "Edit" button of Shelter with email "editShelter2@demo.app"
    And I wait for the spinner to disappear
    And I fill the shelter form with
      | FIELD    | VALUE             |
      | name     | editAdminShelter  |
    And I click the "Submit" button
    Then Shelter with name "editAdminShelter" is updated


  Scenario: Edit Shelter with invalid name
    Given I'm in the homepage
    And I'm logged in as "admin" with password "password"
    And I click the "Shelters" menu
    When I click the "Edit" button of Shelter with email "editShelter2@demo.app"
    And I wait for the spinner to disappear
    And I fill the shelter form with
      | FIELD    | VALUE         |
      | name     |               |
    Then I see input field feedback message "Name is required"
    And The "Submit" button is disabled

  Scenario: Edit Shelter with invalid email
    Given I'm in the homepage
    And I'm logged in as "admin" with password "password"
    And I click the "Shelters" menu
    When I click the "Edit" button of Shelter with email "editShelter2@demo.app"
    And I wait for the spinner to disappear
    And I fill the shelter form with
      | FIELD    | VALUE         |
      | email    |               |
    Then I see input field feedback message "Email is required"
    And The "Submit" button is disabled

  Scenario: Edit Shelter with invalid phone
    Given I'm in the homepage
    And I'm logged in as "admin" with password "password"
    And I click the "Shelters" menu
    When I click the "Edit" button of Shelter with email "editShelter2@demo.app"
    And I wait for the spinner to disappear
    And I fill the shelter form with
      | FIELD    | VALUE         |
      | mobile   |               |
    Then I see input field feedback message "A phone number is required"
    And The "Submit" button is disabled



  Scenario: Edit Shelter with repeated email
    Given I'm in the homepage
    And I'm logged in as "admin" with password "password"
    And I click the "Shelters" menu
    When I click the "Edit" button of Shelter with email "editShelter2@demo.app"
    And I wait for the spinner to disappear
    And I fill the shelter form with
      | FIELD    | VALUE                |
      | email    | editShelter@demo.app |
    Then The "Submit" button is disabled
    And I see input field feedback message "This email is already registered"


  Scenario: Edit Shelter with repeated phone
    Given I'm in the homepage
    And I'm logged in as "admin" with password "password"
    And I click the "Shelters" menu
    When I click the "Edit" button of Shelter with email "editShelter@demo.app"
    And I wait for the spinner to disappear
    And I fill the shelter form with
      | FIELD    | VALUE    |
      | mobile   | 2        |
    Then The "Submit" button is disabled
    And I see input field feedback message "This phone number is already registered"


  Scenario: Edit non existing shelter
    Given I'm in the homepage
    And I'm logged in as "admin" with password "password"
    And I'm in the shelter edit page with id 999
    Then I see an error message alert
