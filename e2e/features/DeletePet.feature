Feature: Delete Pet
  In order to manage pets
  As an Admin
  I want to delete pets

  Scenario: Cancel button clicked
    Given I am in the homepage
    And I log in as "admin" with password "password"
    And I am logged in as user "admin"
    And I navigate to the delete confirmation page for pet with ID "1"
    When I click the "Cancel" button
    Then I am redirected to pets grid page

  Scenario: Delete pet as Admin
    Given I am in the homepage
    And I log in as "admin" with password "password"
    And I am logged in as user "admin"
    And I navigate to the delete confirmation page for pet with ID "1"
    When I click the "Delete" button on the delete confirmation page
    And I confirm deletion on the delete confirmation page
    Then I am redirected to pets grid page
    And I do not see the pet with name "Fluffy"
