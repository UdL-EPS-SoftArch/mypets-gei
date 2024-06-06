Feature: Add Pet
  In order to keep track of pets in the shelter
  As an admin or volunteer
  I want to add pets

  Background:
    Given There is a registered admin with name "admin" and password "password" and email "admin@sample.app"
    Given There is a registered volunteer with name "volunteer" and password "password" and email "volunteer@sample.app"

  Scenario: Add pet as Admin
    Given I'm in the homepage
    Given I log in as "admin" with password "password"
    Then I'm logged in as user "admin"
    Given I am in pets page
    When I click the "Add Pet" button
    And I fill the form with
      | FIELD       | VALUE                                                                 |
      | name        | Fake Pet 4                                                            |
      | color       | Black                                                                 |
      | size        | Medium                                                                |
      | weight      | 10                                                                    |
      | age         | 1 year                                                                |
      | breed       | Fake                                                                  |
      | description | This is a fake pet.                                                   |
      | img         | https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=600 |
    And I click the "Add" button
    Then Pet with name "Fake Pet 4" is created

  Scenario: Add pet as Volunteer
    Given I'm in the homepage
    Given I log in as "volunteer" with password "password"
    Then I'm logged in as user "volunteer"
    Given I am in pets page
    When I click the "Add Pet" button
    And I fill the form with
      | FIELD       | VALUE                                                                 |
      | name        | Fake Pet 5                                                            |
      | color       | White                                                                 |
      | size        | Small                                                                 |
      | weight      | 5                                                                     |
      | age         | 2 years                                                               |
      | breed       | Real                                                                  |
      | description | This is another fake pet.                                             |
      | img         | https://images.pexels.com/photos/45202/kitty-cat-kitten-pet-45202.jpeg?auto=compress&cs=tinysrgb&w=600 |
    And I click the "Add" button
    Then Pet with name "Fake Pet 5" is created

  Scenario: Add pet with missing required fields
    Given I'm in the homepage
    Given I log in as "admin" with password "password"
    Then I'm logged in as user "admin"
    Given I am in pets page
    When I click the "Add Pet" button
    And I fill the form with
      | FIELD       | VALUE                                                                 |
      | name        |                                                                       |
      | color       | Black                                                                 |
      | size        | Medium                                                                |
      | weight      | 10                                                                    |
      | age         | 1 year                                                                |
      | breed       | Fake                                                                  |
      | description | This is a fake pet.                                                   |
      | img         | https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=600 |
    Then The "Add" button is disabled
    And I see input field feedback message "Please fill out all fields!"

    # Scenario: Add pet with invalid image link
  #   Given I'm in the homepage
  #   And I navigate to the add pet page
  #   When I fill the add pet form with:
  #     | FIELD       | VALUE                      |
  #     | name        | Fake Pet 5                 |
  #     | color       | White                      |
  #     | size        | Large                      |
  #     | weight      | 20                         |
  #     | age         | 2 years                    |
  #     | breed       | Fake                       |
  #     | description | This is another fake pet.  |
  #     | img         | invalid-url                |
  #   And I click the "Add" button
  #   Then I should see an error message "Invalid image URL"
  #
  # Note: The above scenario should be implemented in future to validate image URLs.
