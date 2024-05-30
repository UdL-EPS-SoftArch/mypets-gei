Feature: Delete Shelter
    In order to use the app
    As a Admin
    I want to delete shelters

Scenario: Cancel button clicked
    Given I am in the homepage
    And I log in as "admin" with password "password"
    And I am logged in as user "admin"
    And I am in shelters page
    When I click the "Delete" button
    And I click the "Cancel" button
    Then I am in shelters page

Scenario: Delete shelter as Admin
    Given I am in the homepage
    And I log in as "admin" with password "password"
    And I am logged in as user "admin"
    And I am in shelters page
    When I click the "Delete" button
    And I click the "Confirm" button
    Then I do not see shelter

Scenario: Delete shelter as volunteer
    Given I am in the homepage
    Given I log in as "volunteer" with password "password"
    Then I am logged in as user "volunteer"
    Given I am in shelters page
    Then I do not see "Add new Shelter" button
