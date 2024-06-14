Feature: Disable User
  In order to use the app
  As a admin
  I want to disable a user

    Scenario: View Users List
        Given I'm in the homepage
        And I'm logged in as "admin" with password "password"
        And I click the "Users" menu
        Then I click the "List" menu
        Then I am redirected to the "/users" page
        And I can view the list of users