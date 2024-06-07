Feature: Kick Volunteer From Shelter
  In order to manage a shelter
  As a volunteer
  I want to kick volunteers from the shelter


  Scenario: Volunteer kicks volunteer from the same shelter
    Given I'm in the homepage
    And There is a registered volunteer with username "volunteerkick2" and password "password" in shelter "shelter"
    And There is a registered volunteer with username "volunteerkick1" and password "password" in shelter "shelter"
    #And There is a created shelter with  email "shelter@demo.app"
    Given I log in as "volunteer1" with password "password"
    Then I'm logged in as user "volunteer1"
    And I am in shelters "shelter1" edit page
    When I click the "Kick" button from the volunteer "volunteer2"
    And I click the Kick button
    And Refresh
    Then I do not see "volunteer2"

  Scenario: Volunteer can't kick himself
    Given I'm in the homepage
    And There is a registered volunteer with username "volunteerkick2" and password "password" in shelter "shelter"
    And There is a registered volunteer with username "volunteerkick1" and password "password" in shelter "shelter"
    #And There is a created shelter with  email "shelter@demo.app"
    Given I log in as "volunteer1" with password "password"
    Then I'm logged in as user "volunteer1"
    And I am in shelters "shelter1" edit page
    And I do not see the "Kick" button from the volunteer "volunteer1"
