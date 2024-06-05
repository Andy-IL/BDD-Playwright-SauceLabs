// attempting to put Then clauses in a separate file for the loginerror feature
import { Given, When, Then } from '@cucumber/cucumber' ;
import { chromium, Browser, Page  } from 'playwright';
import {expect } from '@playwright/test' ;

let browser: Browser;
let page: Page;


  // Then ('the login page stays open', async() =>  {
  //   console.log("thenclauses.ts says: did the login page stay up? ")
  //   await expect(page.locator('#root')).toContainText('Swag Labs');
  //   await expect(page.locator('[data-test="item-0-title-link"] [data-test="inventory-item-name"]')).not.toBeVisible();
  // } ) ; 

  export {Then} ;