Feature: Delete Shelter
    In order to use the app
    As a Admin
    I want to delete shelters

Background:
#    Given There is a registered admin with name "admin" and password "password" and email "admin@sample.app"
#    Given There is a registered volunteer with name "volunteer" and password "password" and email "volunteer@sample.app"
#    Given There is a created shelter with name "shelter" and email "shelter@sample.app" and mobile "123456789"

Scenario: Delete shelter as Admin
    Given I'm in the homepage
    Given I log in as "admin" with password "password"
    Then I'm logged in as user "admin"
    Given I am in shelters page
    When I click the "Create new Shelter" button
    And I fill the form with
      | FIELD    | VALUE            |
      | name     | shelter          |
      | email    | shelter@demo.app |
      | mobile   | 123456789        |
    And I click the "Submit" button
    Then Shelter with phone number "123456789" is created
    When I click the "Delete" button
    Given I am in delete shelter page


