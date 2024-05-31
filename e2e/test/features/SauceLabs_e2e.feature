# feature file for e2e tests 
# Feature: Login functionality

# Scenario Outline: User login and logout
#   Given <userState>
#   When I <action>
#   Then I see the <result>>

# Examples:
#   | userState        | action   | result page|
#   | I am on the login page | login  | products | 
#   | I am a logged-in user  | logout | login    |
Feature:  SauceLabs shopping app E2E
As a logged-in userI want to buy  products

Scenario: log in and buy a product
Given the saucelabs URL is open at the login page 
And I log in as a standard user 
And I add product "Sauce Labs Bike Light" to trolley
When I click the trolley icon 
Then the “Your Cart” page appears
And the correct details for product "Sauce Labs Bike Light" appear
# And product "Sauce Labs Bike Light" has total $9.99
When I click the Checkout button
Then the checkout page appears
When I enter firstName, LastName, postcode
Then the Checkout: Overview page appears 
When I click the Finish button 
Then the order confirmation message appears


