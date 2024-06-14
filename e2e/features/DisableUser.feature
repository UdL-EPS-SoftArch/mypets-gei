Feature: Disable User
  In order to use the app
  As a admin
  I want to disable a user

  Scenario: View Users List
    Given I'm in the homepage
    And I'm logged in as "demo" with password "password"
    And I click the "demo" menu
    And I click the "User List" button
    Then I can view the list of users