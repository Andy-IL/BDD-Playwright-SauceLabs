# feature file for saucelabs tests 
# Feature: basic login and navigation tests

Feature:  SauceLabs login page checks
As a test visitor I want the login page to be correct 

@prelogin
Scenario Outline: check login page
Given user navigates to URL

Then the login page Accepted Usernames contains "<username>"
And the login page Password for all users contains "<password>"
When I close the browser
Examples:
| username                | password      |
| standard_user           | secret_sauce  |
 | locked_out_user         | secret_sauce  |
 | problem_user            | secret_sauce  |
# | performance_glitch_user | secret_sauce  |
# | error_user              | secret_sauce  |
# | visual_user             | secret_sauce  |