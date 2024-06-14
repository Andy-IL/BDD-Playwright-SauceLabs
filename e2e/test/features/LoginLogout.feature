Feature:  SauceLabs shopping app login logout
@loginlogout
Scenario:  log in_out 
Given the saucelabs URL is open at the login page 
When I log in as user "standard_user" and password "secret_sauce"
Then the Products page appears
And the cart items count is zero (not visible)

# Given I am a logged-in user
# And the login page appears
When I click the burger menu
# Then the Logout link appears
And  I click the Log Out link
Then the login page Accepted Usernames contains "standard_user" 
When I close the browser