Feature: Shelter Certificate
  In order to manage the app
  As an admin
  I want to check and interact with the shelter certificates

  Scenario: View the shelter certificates
    Given I'm in the homepage
    And I'm logged in as "admin" with password "password"
    When I click the "Validate shelter certificates" menu
    I can view the list of shelter certificates

  