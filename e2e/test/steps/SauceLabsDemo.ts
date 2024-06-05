// Steps file for cucumber practice
// 
import { Given, When, Then,  AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import test from 'node:test';
import { chromium, Browser, Page  } from 'playwright';
import {expect } from '@playwright/test' ;
import { Then as externalThen} from './thenclauses' ;

let browser: Browser;
let page: Page;
setDefaultTimeout (15000) ;
  
// global value 
let cartItemCount = 0 ; 
let itemsPriceTotal = 0.00 ; 
let cartPriceTotal = 0.00 ;
let VATRate = 0.08 ;
// basics  here
Given('the saucelabs URL is open at the login page', async () => {
  browser = await chromium.launch({
     slowMo: 500 ,   
      headless: false, });
 page = await browser.newPage();
 await page.goto('https://www.saucedemo.com/');
 await expect(page.locator('#root')).toContainText('Swag Labs');

}) ;

// ############################ login 
When ('I log in as user {string} and password {string}', async(username: string, password: string) =>  {
console.log("login received parameters: " + username + " and " + password) ;
  // await page.locator('[data-test="username"]').click();
  await page.locator('[id="user-name"]').click();
  await page.locator('[id="user-name"]').fill(username) ;
  await page.locator('[id="password"]').click();
  await page.locator('[id="password"]').fill(password) ;
  await page.locator('[id="login-button"]').click();

  // check logged in 
  await expect(page.locator('[data-test="item-0-title-link"] [data-test="inventory-item-name"]')).toBeVisible();
//  Then('I see a burger menu', async() => { } ) ;
    console.log("And burger menu?  ...") ;
    await expect(page.getByRole('button', { name: 'Open Menu' })).toBeEnabled();
    
}) ;

Then ('the Products page appears', async () => {
  await expect(page.locator('[data-test="title"]')).toContainText("Products") ;

} );

Then ('the cart items count is zero \\(not visible\\)', async() =>  {
  await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible();
  console.log ("Trolley empty, expected  " + cartItemCount + " items found") ;

}) ;
Then ('the cart items count increments', async() =>  {
  let tempstr = '' ;
  cartItemCount = cartItemCount + 1 ;  // global 
  tempstr = tempstr + await (page.locator('[data-test="shopping-cart-badge"]').textContent()) ;
  let latestCount = parseInt(tempstr, 10) ;
// e.g.  await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');
  
   expect (latestCount === cartItemCount) ;
  console.log ("Trolley shows badge str : " + tempstr + ", badge int: " + latestCount +"  and " + cartItemCount + " items") ;
} ) ;

Then ('the cart total increases by {string}', async(price: string) =>  {
 // VATRate, cartPriceTotal, itemsPriceTotal are  globals 
// global values
// let itemsPriceTotal = 0.00 ; 
// let cartPriceTotal = 0.00 ;
//  let VATRate = 0.08 ;

 // calculate expectation
  let itemPrice = parseFloat (price) ;
  let itemTax = itemPrice * VATRate ; // caution re: rounding
// Keeping track of the total price
   itemsPriceTotal  = itemsPriceTotal + itemPrice  ; 
   cartPriceTotal = cartPriceTotal + itemsPriceTotal + itemTax ;
   console.log ("Expected price of items is " + itemsPriceTotal + " tax is " + itemTax +" and grand total should be: " + cartPriceTotal) ;

   // Get the actuals 
   let itemsPriceTotalStr  ='Got: ' ;
      itemsPriceTotalStr = itemsPriceTotalStr + await page.locator('[data-test="subtotal-label"]').textContent () ;
   let totalTaxStr = await page.locator('[data-test="tax-label"]').textContent () ;
   let cartPriceTotalStr =   await page.locator('[data-test="total-label"]').textContent() ;
 
console.log ("Got items  total: " + itemsPriceTotalStr  + ", tax : " + totalTaxStr + ", and total: " + cartPriceTotalStr)  ;
} ) ;

// ############################ navigation and screen checks
When ('I click the burger menu', async() =>  {
  await page.getByRole('button', { name: 'Open Menu' }).click();
 
}) ;

When ('I click the cart icon', async() =>  {
  await page.locator('[data-test="shopping-cart-link"]').click();
  
}) ;

// ############################ Fill basket
When('I add {string} of product {string} with {string} to cart', async(qty: string, product: string, identifier: string) =>  {

  // example:   await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  //            await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toContainText('Remove');

  //  handle qty here i.e. add int(qty) to global qty_of_product[ ] 
  let tempstrAdd = "[data-test=\"add-to-cart-" + identifier + "\"]" ;
  let tempstrRemove = "[data-test=\"remove-" + identifier + "\"]" ;
  
  console.log("assembled locators: " + tempstrAdd + "and: " + tempstrRemove) ;
  await page.locator(tempstrAdd).click();
// check that the button changes 
  await expect(page.locator(tempstrRemove)).toContainText('Remove');

}) ; 

// ############################ Checkout
When ('I click the Checkout button', async() =>  {
  await page.getByRole('button', { name: 'checkout' }).click();
 
}) ;

Then('the checkout page appears', async() => {
  await expect(page.locator('[data-test="title"]')).toContainText("Checkout: Your Information") ;
  await expect(page.locator('[data-test="continue"]')).toBeVisible();
  await expect(page.locator('[data-test="cancel"]')).toBeVisible();

} );

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
When ('I click the Back Home button', async() =>  {
  await page.locator('[data-test="back-to-products"]').click();

}) ;

When ('I click the Continue Shopping button', async() =>  {
  console.log("clicking Continue Shopping I believe") ;
  await page.locator('[data-test="continue-shopping"]').click();

}) ;

// ############################ Logout 
Then ('the logout link appears', async() =>  {
  await page.locator('[data-test="logout-sidebar-link"]').isVisible();
}) ;

When ('I click the Log Out link', async() =>  {
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
}) ;


Then('I see a cart icon', async() => {
  console.log("And cart = trolley menu?  ...") ;
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
// ############################

Then('the details for {string} of product {string} with {string} and price {string} appear', async(qty: string, product: string, identifier: string, price:string) => {
  let tempstrRemove = "[data-test=\"remove-" + identifier + "\"]" ;
  let maxIndex = 0 ; 
  // confirm item is visible
  await expect(page.locator(tempstrRemove)).toContainText('Remove');

  // go to the last matching item

  maxIndex = (await (page.locator('[data-test="inventory-item-name"]')).count()) - 1;
    //   await expect(page.locator('[data-test="inventory-item-name"]')).toContainText(product);
    console.log("assembled locator: " + tempstrRemove + "and seeking the expected data at index: " + maxIndex) ;
 
    await expect(page.locator('[data-test="inventory-item-name"]').nth(maxIndex)).toContainText(product);
    await expect(page.locator('[data-test="item-quantity"]').nth(maxIndex)).toContainText(qty);
    await expect(page.locator('[data-test="inventory-item-price"]').nth(maxIndex)).toContainText(price) ;   
    console.log("Found the expected data at index: " + maxIndex) ;
  
//   await expect(page.locator('[data-test="item-quantity"]')).toContainText(qty);

});

Then('the Checkout: Overview page appears', async() => {
  await expect(page.locator('[data-test="shipping-info-value"]')).toContainText('Free Pony Express Delivery!');
  await expect(page.locator('[data-test="total-label"]')).toContainText('Total: $');

}) ;
Then ('the correct price calculations for product {string} and price {string} appear', async(product: string, price:string) => {
  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText(product);
  await expect(page.locator('[data-test="inventory-item-price"]')).toContainText(price) ;
//   let totalPriceStr = await (page.locator('[data-test="inventory-item-price"]')).getText().toInt()
//   let int taxExpected =  await (page.locator('[data-test="tax-label"]')).
  await expect(page.locator('[data-test="subtotal-label"]')).toContainText(price);
  await expect(page.locator('[data-test="tax-label"]')).toContainText('Tax: $');
  await expect(page.locator('[data-test="total-label"]')).toContainText('Total: $');
  

} ) ;
Then('the order confirmation message appears', async() => {
  await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
  await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();

}) ;

// ##########################  LoginErrors - uses Given ('the saucelabs URL is open at the login page' etc )
When ('I try to log in as user {string} and password {string}', async(username: string, password: string) =>  {
  console.log("Attempted login received parameters: " + username + " and " + password) ;
  await expect(page.locator('#root')).toContainText('Swag Labs');
  await page.locator('[data-test="username"]').click();
  await page.locator('[id="user-name"]').click() ;
  await page.locator('[id="user-name"]').fill(username) ;
  await page.locator('[id="password"]').click();
  await page.locator('[id="password"]').fill(password) ;
  await page.locator('[id="login-button"]').click();

}) ;

Then('an error message {string} appears' , async(error_msg: string) =>  {
  console.log ("looking for error: " + error_msg) ;
  await expect(page.locator('[data-test="error"]')).toContainText(error_msg);

} ) ;

Then ('the login page stays open', async() =>  {
  console.log("Did the login page stay up? ")
  await expect(page.locator('#root')).toContainText('Swag Labs');
  await expect(page.locator('[data-test="item-0-title-link"] [data-test="inventory-item-name"]')).not.toBeVisible();
} ) ; 