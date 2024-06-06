Feature: Kick Volunteer From Shelter
  In order to manage a shelter
  As a volunteer
  I want to kick volunteers from the shelter


  Scenario: Login existing user
    Given I'm in the homepage
    And There is a registered user with username "volunteer_kick2" and password "password"
    And There is a registered user with username "volunteer_kick1" and password "password"
    Given I log in as "volunteer_kick1" with password "password"
    And There is a created shelter with name "shelter_kick" and email "shelter_kick@sample.app" and mobile "999999999"
    
    And I am in shelters edit page
    And I click the "Kick" button from the volunteer "volunteer_kick2"
    Then I am in shelters edit page
    And There isn't any volunteer "volunteer_kick2"