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

  