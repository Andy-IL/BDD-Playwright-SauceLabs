// Steps file for cucumber practice
// 
import { Given, When, Then,  AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import test from 'node:test';
import { chromium, Browser, Page  } from 'playwright';
import {expect } from '@playwright/test'

let browser: Browser;
let page: Page;
setDefaultTimeout (15000) ;
  
Given('user navigates to URL', async () => {
   console.log("Doing Given clause") ;
   browser = await chromium.launch({
    headless: false
  });
  page = await browser.newPage();
  await page.goto('https://www.saucedemo.com/');
  await expect(page.locator('#root')).toContainText('Swag Labs');
  console.log("Did you see browser?  " ) ;
  browser.close() ;
});

Given('the saucelabs URL is open at the login page', async () => {
  console.log("Given clause - not background") ;
  browser = await chromium.launch({
   headless: false,
 });
 page = await browser.newPage();
 await page.goto('https://www.saucedemo.com/');
 await expect(page.locator('#root')).toContainText('Swag Labs');

// await expect(page.getByTitle('Swag Labs').waitFor({"timeout": 10000})).toBeDefined() ;

}) ;

When ('I log in as a standard user', async() =>  {

  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  // check logged in 
  await expect(page.locator('[data-test="item-0-title-link"] [data-test="inventory-item-name"]')).toBeVisible();

}) ;
When ('I click the burger menu', async() =>  {
  await page.getByRole('button', { name: 'Open Menu' }).click();
 
}) ;

When ('I click the trolley icon', async() =>  {
  await page.locator('[data-test="shopping-cart-link"]').click();
  
}) ;

When('I add product "Sauce Labs Bike Light" to trolley', async() =>  {
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

}) ; 

When ('I click the Checkout button', async() =>  {
  await page.getByRole('button', { name: 'checkout' }).click();
 
}) ;

When('I enter firstName, LastName, postcode' , async() =>  {
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('First_Name');
  await page.locator('[data-test="firstName"]').press('Tab');
  await page.locator('[data-test="lastName"]').fill('LAst_Name');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('AB1 2CD');
  await page.locator('[data-test="continue"]').click();
}) ;

When ('I click the Finish button' , async() =>  {
  await page.locator('[data-test="finish"]').click();

}) ;


When ('I click the Log Out link', async() =>  {
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
}) ;

Then('I see the Products page', async() => {
  console.log("Then clause ...") ;
  await expect(page.locator('[data-test="item-0-title-link"] [data-test="inventory-item-name"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toContainText("Products") ;
//   await expect(page.getByTitle("Products")) ;

}) ;

Then('I see a Sauce Labs Bike Light product', async() => {
  console.log("And Bike Light?  ...") ;
  await expect(page.locator('[data-test="item-0-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Bike Light');

}) ;

Then('I see a burger menu', async() => {
  console.log("And burger menu?  ...") ;
  await expect(page.getByRole('button', { name: 'Open Menu' })).toBeEnabled();
 
}) ;

Then('I see a trolley icon', async() => {
  console.log("And trolley  menu?  ...") ;
  await expect(page.getByRole('button', { name: 'Open Menu' })).toBeEnabled();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();

}) ;

Then ('the SauceLabs URL is open at the login page', async() => {
  await expect(page.locator('#root')).toContainText('Swag Labs');
}) ;  

Then ('the “Your Cart” page appears', async() => {
    await expect(page.locator('[data-test="title"]')).toContainText("Your Cart") ;
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
    await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
    
}) ;

Then('the checkout page appears', async() => {
  await expect(page.locator('[data-test="title"]')).toContainText("Checkout: Your Information") ;
  await expect(page.locator('[data-test="continue"]')).toBeVisible();
  await expect(page.locator('[data-test="cancel"]')).toBeVisible();

} );

Then('the correct details for product "Sauce Labs Bike Light" appear', async() => {
  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Bike Light');
  await expect(page.locator('[data-test="item-quantity"]')).toContainText('1');

});

Then('the Checkout: Overview page appears', async() => {
  await expect(page.locator('[data-test="shipping-info-value"]')).toContainText('Free Pony Express Delivery!');
  await expect(page.locator('[data-test="total-label"]')).toContainText('Total: $');

}) ;

Then('the order confirmation message appears', async() => {
  await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
  await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();

}) ;
