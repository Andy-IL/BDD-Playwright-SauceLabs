# feature file for e2e tests 
# Feature: buy products

Feature:  SauceLabs shopping app E2E
As a logged-in user I want to buy several products in a transaction

Scenario:  log in 
Given the saucelabs URL is open at the login page 
And I log in as user "standard_user" and password "secret_sauce"
Then the Products page appears
And the cart items count is zero (not visible)

Scenario Outline: buy products

When I add "<qty>" of product "<product>" with "<identifier>" to cart
Then the cart items count increments
When I click the cart icon 
Then the “Your Cart” page appears
And the details for "<qty>" of product "<product>" with "<identifier>" and price "<price>" appear
# And the cart total increases by "<price>"
When I click the Continue Shopping button
Then the Products page appears

# When I click the Checkout button
# Then the checkout page appears
# When I enter firstName, LastName, postcode
# Then the Checkout: Overview page appears 
# And the correct price calculations for product "<product>" and price "<price>" appear
#  When I click the Finish button 
#  Then the order confirmation message appears
#  When I click the Back Home button 
#  Then the Products page appears

Examples:
| product                    | price   | qty    | identifier               | 
| Sauce Labs Bike Light      |   9.99  |   1    | sauce-labs-bike-light    | 
| Sauce Labs Fleece Jacket   |  49.99  |   1    | sauce-labs-fleece-jacket | 
| Sauce Labs Onesie          |  7.99   |   1    | sauce-labs-onesie        | 
| Sauce Labs Bolt T-Shirt    |  15.99  |   1    | sauce-labs-bolt-t-shirt  | 
| Sauce Labs Backpack        |  29.99  |   1    | sauce-labs-backpack      | 
#| Test.allTheThings() T-Shirt (Red)      |   9.99  |   1    | sauce-labs-bike-light    | 
