Feature: Delete Shelter
    In order to use the app
    As a Admin
    I want to delete shelters

Scenario: Delete shelter as Admin
    Given I am in the homepage
    Given I log in as "admin" with password "password"
    Then I am logged in as user "admin"
    Given I am in shelters page
    When I click the "Create new Shelter" button
    And I fill the form with
      | FIELD  | VALUE             |
      | name   | shelteR           |
      | email  | shelter@demo.app  |
      | mobile | 123456789         |
    And I click the "Submit" button
    Then I click the "Delete" button
    Then I click the "Delete" button
    Then I click the "Delete" button
    Then I do not see shelter 

Scenario: Delete shelter as volunteer
    Given I am in the homepage
    Given I log in as "volunteer" with password "password"
    Then I am logged in as user "volunteer"
    Given I am in shelters page
    Then I do not see "Add new Shelter" button

Scenario: Cancel button clicked
    Given I am in the homepage
    Given I log in as "admin" with password "password"
    Then I am logged in as user "admin"
    Given I am in shelters page
    When I click the "Create new Shelter" button
    And I fill the form with
      | FIELD  | VALUE             |
      | name   | shelteR           |
      | email  | shelter@demo.app  |
      | mobile | 123456789         |
    And I click the "Submit" button
    Then I click the "Delete" button
    Then I click the "Cancel" button
    Then I am in shelters page