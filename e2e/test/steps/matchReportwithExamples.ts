// match report steps where fixtures are found 
import { Given, When, Then,  AfterAll } from '@cucumber/cucumber';
import test from 'node:test';
import { chromium, Browser, Page } from 'playwright';
import {expect} from '@playwright/test'

let browser: Browser;
let page: Page;


Given('today\'s date is {string}', async (date: string) => {
console.log("got date string: " + date)
});

// Given('there are no Irish matches scheduled for today {string}', async (date: string) => {
//   console.log("got date string: for Irish matches: " + date)

// });

 When('I request to see the teams playing today {string}', async (date: string) => {

  console.log ("Getting fixtures for Date : " + date ) ;
  browser = await chromium.launch({
    headless: false
  });
  page = await browser.newPage();
  await page.addLocatorHandler(
    page.getByText('Let us know you agree to cookies' ),
    async () => {
      console.log("spotted cookies panel") ;
       await page.getByRole('button', { name: 'Yes, I agree' }).click() ;
    });
  await page.goto('https://www.bbc.co.uk/sport/football/scores-fixtures/' +date);
//  console.log("Did you see browser?  " ) ;
  // browser.close() ;
});


Then('the system should display the list of {string} teams', async (variant: string) => {
  let matchesFound = await page.getByText(variant).count()
  console.log("Found this many " + variant +" matches: '" +matchesFound + "'")
  expect(matchesFound.valueOf() == 0).toBeFalsy() ;
});

Then('there should be at least one {string} team playing today', async (variant: string) => {
  let teamsFound =  (await page.getByText(variant).count()).valueOf()
  console.log("Deducing this many teams: '" + teamsFound * 2 + "'") ;
  expect(teamsFound >= 1).toBeTruthy() ;
  // await browser.close() ;
});

Then('the system should display a message indicating no Irish matches today', async () => {
//  
let IrishteamsFound = (await page.getByText("Irish").count()).valueOf()
console.log("Deducing this many Irish teams: '" + IrishteamsFound * 2 + "'") ;
expect(IrishteamsFound == 0).toBeTruthy() ;
// browser.close() ;
});


// Then('the system should display the list of {string} teams', async (variant: string) => {
//     let womensTeamsFound = (await page.getByText("Women").count()).valueOf()
//     console.log("Deducing this many women's matches: '" + womensTeamsFound  + "'") ;
//     expect(womensTeamsFound >= 1).toBeTruthy() ;
// // browser.close() ;
// });

// Trying to close browser cleanly after each test
// AfterAll(async () => {
// //  Add a delay of 4.5 seconds
//     await new Promise((resolve) => setTimeout(resolve, 4500));
//     await  page.close();
// }) ;

//   More attempts to close without timeout
//     // Set the maximum timeout duration in milliseconds
//     const timeoutDuration = 5000; // 5 seconds
  
//     // Create a promise that resolves when browser.close() is called
//  //    const closePromise = browser.close();
  
//     // Create a promise that rejects after the specified timeout duration
//     // const timeoutPromise = new Promise((_, reject) => {
//     //   setTimeout(() => {
//     //     reject(new Error('Timeout: browser.close() took too long.'));
//     //   }, timeoutDuration);
//     // });
  
//     // Use Promise.race() to handle the first resolved promise
//     // await Promise.race([closePromise, timeoutPromise]);
  
//     console.log('Browser closed successfully.');
  
//});


