Feature: Add Pet
  In order to add new pets to the system
  As an admin or shelter volunteer
  I want to be able to add pets

  Scenario: Add pet with valid details
    Given I'm in the homepage
    Given I log in as "admin" with password "password"
    Then I'm logged in as user "admin"
    Given I am in pets page
    When I click the "Add" button
    And I fill the form with
      | FIELD       | VALUE                                                                 |
      | name        | New Pet                                                               |
      | color       | Brown                                                                 |
      | size        | Medium                                                                |
      | weight      | 12                                                                     |
      | age         | 2 years                                                               |
      | breed       | Labrador                                                              |
      | description | A friendly dog                                                        |
      | img         | https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg |
    And I click the "Add" button
    Then Pet with name "New Pet" is created

  Scenario: Add pet with missing fields
    Given I'm in the homepage
    Given I log in as "admin" with password "password"
    Then I'm logged in as user "admin"
    Given I am in pets page
    When I click the "Add" button
    And I fill the form with
      | FIELD       | VALUE |
      | name        | New Pet |
      | color       | Brown |
    Then I attempt to click the "Add" button
    And I verify the "Add" button is disabled

  Scenario: Add pet with invalid image URL
    Given I'm in the homepage
    Given I log in as "admin" with password "password"
    Then I'm logged in as user "admin"
    Given I am in pets page
    When I click the "Add" button
    And I fill the form with
      | FIELD       | VALUE                                    |
      | name        | New Pet                                  |
      | color       | Brown                                    |
      | size        | Medium                                   |
      | weight      | 12                                       |
      | age         | 2 years                                  |
      | breed       | Labrador                                 |
      | description | A friendly dog                           |
      | img         | invalid-url                              |
    And I click the "Add" button
    Then I see an alert with message "Please enter a valid image URL"
