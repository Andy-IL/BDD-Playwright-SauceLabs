# feature file for e2e tests 
# Feature: buy products

Feature:  SauceLabs shopping app E2E
As a logged-in user I want to buy several products in a transaction

@login, @remove
Scenario:  log in 
Given the saucelabs URL is open at the login page 
When I log in as user "standard_user" and password "secret_sauce"
Then the Products page appears
And the cart items count is zero (not visible)

@remove
Scenario Outline: add, remove, replace and buy products
# Given I am a logged-in user 
Given the Products page appears
When I add "<qty>" of product "<product>" with "<identifier>" to cart
Then the cart items count increments
And the running subtotal increases by "<price>"
And the Remove button for "<identifier>" appears
# remove from Products page   
When I click the Remove button for "<identifier>"
# # Then the product Add to Cart button appears
Then the cart items count decrements
And the running subtotal decreases by "<price>"
#  Replace the removed item 
When I add "<qty>" of product "<product>" with "<identifier>" to cart
Then the cart items count increments
And the running subtotal increases by "<price>"
And the Remove button for "<identifier>" appears
# to cart with item
When I click the cart icon 
Then the “Your Cart” page appears
And the details for "<qty>" of product "<product>" with "<identifier>" and price "<price>" appear
And the Remove button for "<identifier>" appears
#  click remove, check empty Your Cart page
When I click the Remove button for "<identifier>"
# Then the “Your Cart” page appears with no items
Then the running subtotal decreases by "<price>"

# Add item in again
When I click the Continue Shopping button
Then the Products page appears

When I add "<qty>" of product "<product>" with "<identifier>" to cart
Then the cart items count increments
And the running subtotal increases by "<price>"
And the Remove button for "<identifier>" appears

# to cart again 
# to cart with item
When I click the cart icon 
Then the “Your Cart” page appears
And the details for "<qty>" of product "<product>" with "<identifier>" and price "<price>" appear
And the Remove button for "<identifier>" appears

#  And checkout at last 
 When I click the Checkout button
 Then the checkout page appears
 When I enter firstName, LastName, postcode
 Then the Checkout: Overview page appears 
 And the correct price calculations for product "<product>" and price "<price>" appear

# # cancel checkout 
# When I click the Cancel button
# Then the Products page appears
# Here's actual purchase
 When I click the Finish button 
 Then the order confirmation message appears
 When I click the Back Home button 
 Then the Products page appears
 And the cart items count is zero (not visible)

Examples:
| product                    | price   | qty    | identifier               | 
| Sauce Labs Bike Light      |   9.99  |   1    | sauce-labs-bike-light    | 
| Sauce Labs Backpack        |  29.99  |   1    | sauce-labs-backpack      | 
| Sauce Labs Fleece Jacket   |  49.99  |   1    | sauce-labs-fleece-jacket | 
#| Sauce Labs Onesie          |  7.99   |   1    | sauce-labs-onesie        | 
#| Sauce Labs Bolt T-Shirt    |  15.99  |   1    | sauce-labs-bolt-t-shirt  | 
# | Test.allTheThings() T-Shirt (Red)      |   9.99  |   1    | sauce-labs-bike-light    | 
