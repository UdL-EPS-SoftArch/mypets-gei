Feature: Create Shelter
In ordrer to procide temporary housing for animals
As a Admin
I want to create shelters

#Background:
#    Given There is a registered admin with name "admin" and password "password" and email "admin@sample.app"
#    Given There is a registered volunteer with name "volunteer" and password "password" and email "volunteer@sample.app"

Scenario: Create shelter as Admin
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

Scenario: Create shelter as Volunteer
    Given I'm in the homepage
    Given I log in as "volunteer" with password "password"
    Then I'm logged in as user "volunteer"
    Given I am in shelters page
    Then I don't see "Create new Shelter" button

Scenario: Create shelter with invalid mail format
    Given I'm in the homepage
    Given I log in as "admin" with password "password"
    Then I'm logged in as user "admin"
    Given I am in shelters page
    When I click the "Create new Shelter" button
    And I fill the form with
      | FIELD    | VALUE            |
      | name     | shelter          |
      | email    | shelter          |
      | mobile   | 123456789        |
    Then The "Submit" button is disabled
    And I see input field feedback message "Invalid email format"

Scenario: Create shelter with empty name
    Given I'm in the homepage
    Given I log in as "admin" with password "password"
    Then I'm logged in as user "admin"
    Given I am in shelters page
    When I click the "Create new Shelter" button
    And I fill the form with
      | FIELD    | VALUE            |
      | email    | shelter@demo.app |
      | mobile   | 123456789        |
    Then The "Submit" button is disabled
    
Scenario: Create shelter with empty email
    Given I'm in the homepage
    Given I log in as "admin" with password "password"
    Then I'm logged in as user "admin"
    Given I am in shelters page
    When I click the "Create new Shelter" button
    And I fill the form with
      | FIELD    | VALUE            |
      | name     | shelter          |
      | mobile   | 123456789        |
    Then The "Submit" button is disabled

Scenario: Create shelter with empty mobile
    Given I'm in the homepage
    Given I log in as "admin" with password "password"
    Then I'm logged in as user "admin"
    Given I am in shelters page
    When I click the "Create new Shelter" button
    And I fill the form with
      | FIELD    | VALUE            |
      | name     | shelter          |
      | email    | shelter@demo1.app|
    Then The "Submit" button is disabled

Scenario: Register user with an existing email
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
    Then I see input field feedback message "This email is already registered"
    Then The "Submit" button is disabled
Scenario: Register user with an existing mobile
    Given I'm in the homepage
    Given I log in as "admin" with password "password"
    Then I'm logged in as user "admin"
    Given I am in shelters page
    When I click the "Create new Shelter" button
    And I fill the form with
      | FIELD    | VALUE            |
      | name     | shelter          |
      | email    | shelter1@demo.app |
      | mobile   | 123456789        |
    Then I see input field feedback message "This phone number is already registered"
    Then The "Submit" button is disabled