Feature: Favurite/Unfavourite a pet
    In order to separate between the pets I would like to adopt and those I wouldn't
    As a user
    I want to set and unset pets as favourites

# Mantenit per recordar els canvis fets a DBInitialization al backend
#    Background:
#        Given There is a registered user with name "user" and password "password" and email "userFavourite@sample.app"
#        Given There is a registered pet that the user has favourited already
#        Given There is a registered pet that the user has not favourited yet

    Scenario: Set pet as favourite
        Given I am in the homepage
        Given I log in as "userFavourite" with password "password"
        Then I'm logged in as user "user"
        When I click the "Pets" menu
        When I click the "List" dropdown
        Then I go into the pet "Max" details
        When I click the "❤" button
        Then The pet is set as favourite

    Scenario: Unset pet as favourite
        Given I am in the homepage
        Given I log in as "userFavourite" with password "password"
        Then I'm logged in as user "user"
        When I click the "Pets" menu
        When I click the "List" dropdown
        Then I go into the pet "Rex" details
        When I click the "💔" button
        Then The pet is deleted as favourite