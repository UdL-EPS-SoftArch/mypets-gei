Feature: Create Shelter
In ordrer to procide temporary housing for animals
As a Admin
I want to create shelters

#Background:
#    Given There is a registered admin with name "admin" and password "password" and email "admin@sample.app"

Scenario: Create shelter as Admin
    Given I'm in the homepage
    Given I log in as "admin" with password "password"
    Then I'm logged in as admin "admin"
    Given I am in shelters page
    When I click the "Create new Shelter" button
    And I fill the form with
      | FIELD    | VALUE            |
      | name     | shelter          |
      | email    | shelter@demo.app |
      | mobile   | 123456789        |
    And I click the "Submit" button
    Then Shelter with phone number "phone" is created