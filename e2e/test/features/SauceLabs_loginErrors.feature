# feature file for saucelabs tests 
# Feature: basic login and navigation tests

Feature:  SauceLabs login and navigation
As a test visitor I want to check log in error handling
@loginerrors
Scenario Outline: check login error handling

Given the saucelabs URL is open at the login page 
When  I try to log in as user "<username>" and password "<password>"
Then the login page stays open
And an error message "<error_msg>" appears
When I close the browser

Examples: 
| username      | password      | error_msg  | 
| standard_user |  bad_pass     |Epic sadface: Username and password do not match any user in this service |
| locked_out_user | secret_sauce | Epic sadface: Sorry, this user has been locked out. |
|   |  | Epic sadface: Username is required |
