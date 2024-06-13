Feature: Shelter Certificate
  In order to manage the app
  As an admin
  I want to check and interact with the shelter certificates

  Background:
    Given I'm in the homepage
    And I'm logged in as "admin" with password "password"
    And I click the "Validate shelter certificates" menu

  Scenario: View the shelter certificates
    Then I can view the list of shelter certificates
  
  Scenario: Add shelter certificate
    And I click the "Shelters" menu
    When I click the "Edit" button of Shelter with email "editShelter2@demo.app"
    And I wait for the spinner to disappear
    And I click the "Add certificate" button
    And I fill the certificate date with a valid one
    And I click the "Add" button
    Then The popup closes

Scenario: Validate a shelter certificates
    And The first shelter certificate is "Not validated"
    When I click the "Validate" button
    Then The first shelter certificate is "Validated"

