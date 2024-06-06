Feature: Edit Shelter
  In order to use the app
  As a Shelter Volunteer or admin
  I want to edit the data of the Shelters

  Scenario: Create Mock Shelters
    Given I'm in the homepage
    And I log in as "admin" with password "password"
    And I click the "Shelters" menu
    When I click the "Create new Shelter" button
    And I fill the form with
      | FIELD    | VALUE             |
      | name     | Shelter           |
      | email    | shelter1@demo.app |
      | mobile   | 1                 |
    And I click the "Submit" button
    And I click the "Create new Shelter" button
    And I fill the form with
      | FIELD    | VALUE             |
      | name     | Shelter2          |
      | email    | shelter2@demo.app |
      | mobile   | 2                 |
    And I click the "Submit" button
    Then Shelter with phone number "1" is created
    And Shelter with phone number "2" is created


  Scenario: Edit Shelter not logged in
    Given I'm in the homepage
    And I'm not logged in
    And I click the "Shelters" menu
    Then The button "Edit" is not present

  Scenario: Edit Shelter as Volunteer
    Given I'm in the homepage
    And I log in as "volunteer" with password "password"
    And I click the "Shelters" menu
    When I click the "Edit" button of Shelter with phone number "1"
    And I wait for the spinner to disappear
    And I fill the form with
      | FIELD    | VALUE            |
      | name     | volunteerShelter |
    And I click the "Submit" button
    Then Shelter with name "volunteerShelter" is updated

  Scenario: Edit Shelter as admin
    Given I'm in the homepage
    And I log in as "admin" with password "password"
    And I click the "Shelters" menu
    When I click the "Edit" button of Shelter with phone number "2"
    And I wait for the spinner to disappear
    And I fill the form with
      | FIELD    | VALUE         |
      | name     | adminShelter  |
    And I click the "Submit" button
    Then Shelter with name "adminShelter" is updated


  Scenario: Edit Shelter with invalid name
    Given I'm in the homepage
    And I log in as "admin" with password "password"
    And I click the "Shelters" menu
    When I click the "Edit" button of Shelter with phone number "2"
    And I wait for the spinner to disappear
    And I fill the form with
      | FIELD    | VALUE         |
      | name     |               |
    Then I see input field feedback message "Name is required"
    And The "Submit" button is disabled

  Scenario: Edit Shelter with invalid email
    Given I'm in the homepage
    And I log in as "admin" with password "password"
    And I click the "Shelters" menu
    When I click the "Edit" button of Shelter with phone number "2"
    And I wait for the spinner to disappear
    And I fill the form with
      | FIELD    | VALUE         |
      | email    |               |
    Then I see input field feedback message "Email is required"
    And The "Submit" button is disabled

  Scenario: Edit Shelter with invalid phone
    Given I'm in the homepage
    And I log in as "admin" with password "password"
    And I click the "Shelters" menu
    When I click the "Edit" button of Shelter with phone number "2"
    And I wait for the spinner to disappear
    And I fill the form with
      | FIELD    | VALUE         |
      | mobile   |               |
    Then I see input field feedback message "A phone number is required"
    And The "Submit" button is disabled



  Scenario: Edit Shelter with repeated email
    Given I'm in the homepage
    And I log in as "admin" with password "password"
    And I click the "Shelters" menu
    When I click the "Edit" button of Shelter with phone number "2"
    And I wait for the spinner to disappear
    And I fill the form with
      | FIELD    | VALUE             |
      | email    | shelter1@demo.app |
    Then The "Submit" button is disabled
    And I see input field feedback message "This email is already registered"


  Scenario: Edit Shelter with repeated phone
    Given I'm in the homepage
    And I log in as "admin" with password "password"
    And I click the "Shelters" menu
    When I click the "Edit" button of Shelter with phone number "1"
    And I wait for the spinner to disappear
    And I fill the form with
      | FIELD    | VALUE    |
      | mobile   | 2        |
    Then The "Submit" button is disabled
    And I see input field feedback message "This phone number is already registered"
