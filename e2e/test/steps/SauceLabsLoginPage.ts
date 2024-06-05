// Steps file for cucumber practice
// 
import { Given, When, Then,  AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page  } from 'playwright';
import {expect } from '@playwright/test'

let browser: Browser;
let page: Page;
setDefaultTimeout (15000) ;
  
Given('user navigates to URL', async () => {
   browser = await chromium.launch({
    headless: false
  });
  page = await browser.newPage();
  await page.goto('https://www.saucedemo.com/');
 });

Then('the login page Accepted Usernames contains {string}' , async (username:string) => {
  await expect(page.locator('#root')).toContainText('Swag Labs');
  await page.locator('[id="user-name"]').click();
  await page.locator('[id="user-name"]').fill('USERNAME');

  await page.locator('[id="password"]').click();
  await page.locator('[id="password"]').fill('PASSWORD') ;
  await page.locator('[id="login-button"]').isEnabled();
    
  await expect(page.locator('[id="login_credentials"]')).toContainText(username);
  
  //browser.close() ;

}) ;
Then ('the login page Password for all users contains {string}', async (password:string) => {
    await expect(page.locator('[data-test="login-password"]')).toContainText(password);

} ) ;
