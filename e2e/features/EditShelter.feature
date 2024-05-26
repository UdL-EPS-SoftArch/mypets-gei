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
      | mobile   | 111111            |
    And I click the "Submit" button
    And I click the "Create new Shelter" button
    And I fill the form with
      | FIELD    | VALUE             |
      | name     | Shelter2          |
      | email    | shelter2@demo.app |
      | mobile   | 222222            |
    And I click the "Submit" button
    Then Shelter with phone number "111111" is created
    And Shelter with phone number "222222" is created



  Scenario: Edit Shelter
    Given I'm in the homepage
    And I log in as "admin" with password "password"
    And I click the "Shelters" menu
    When I click the "Edit" button of Shelter with phone number "111111"
    And I fill the form with
      | FIELD    | VALUE         |
      | name     | newname       |
    And I click the "Submit" button
    Then Shelter with name "newname" is updated



