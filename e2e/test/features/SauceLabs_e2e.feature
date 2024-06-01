# feature file for e2e tests 
# Feature: buy products

Feature:  SauceLabs shopping app E2E
As a logged-in userI want to buy  products

Scenario Outline: log in and buy a product
Given the saucelabs URL is open at the login page 
And I log in as user "<username>" and password secret_sauce
And I add product "<product>" with "<identifier>" to trolley
When I click the trolley icon 
Then the “Your Cart” page appears
And the details for product "<product>" and "<price>" appear
When I click the Checkout button
Then the checkout page appears
When I enter firstName, LastName, postcode
Then the Checkout: Overview page appears 
When I click the Finish button 
Then the order confirmation message appears

Examples:
| product                   | price         | identifier            | username      | password |
| Sauce Labs Bike Light     |   9.99        | sauce-labs-bike-light | standard_user |  secret_sauce |
| Sauce Labs Fleece Jacket  |  49.99        | sauce-labs-fleece-jacket | standard_user | secret_sauce |
| Sauce Labs Bolt T-Shirt   |  15.99        | sauce-labs-bolt-t-shirt | standard_user | secret_sauce |
| Sauce Labs Backpack   |  29.99        | sauce-labs-backpack | standard_user | secret_sauce |


