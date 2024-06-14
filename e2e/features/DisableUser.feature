Feature: Disable User
  In order to use the app
  As a admin
  I want to disable a user

    Scenario: View Users List
        Given I'm in the homepage
        Given I log in as "admin" with password "password"
        Then I'm logged in as user "admin"
        Given I am on the "Users" page
        Then I should see a list of users

    Scenario: Disable User Account
        Given I'm in the homepage
        Given I log in as "admin" with password "password"
        Then I'm logged in as user "admin"
        Given I am on the "Users" page
        Then I click on the "demo" text
        When I click on "Disable" button
        Then I click on the "Disable" button
        Then I should see a message "User Disabled"