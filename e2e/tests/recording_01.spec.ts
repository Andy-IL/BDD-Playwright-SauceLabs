import { test, expect } from '@playwright/test';

test('SauceLabs_recording', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  // check logged in 
  await expect(page.locator('[data-test="item-0-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Bike Light');

  // click on bike light 
  await page.locator('[data-test="item-0-title-link"]').click();
  await page.locator('[data-test="back-to-products"]').click();
  // click on backpack 
  await page.locator('[data-test="item-4-title-link"]').click();
  await page.locator('[data-test="back-to-products"]').click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  // ought to allow 
  //   await page.locator('[data-test="add-to-cart"]').click();
 // remove item 
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // Open burger menu 
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.goto('https://www.saucedemo.com/inventory-item.html?id=4');
  await page.locator('[data-test="back-to-products"]').click();

  // open shopping basket 
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
  await expect(page.locator('[data-test="item-quantity"]')).toContainText('1');

  await page.locator('[data-test="continue-shopping"]').click();
  // Check out ! 
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('First_Name');
  await page.locator('[data-test="firstName"]').press('Tab');
  await page.locator('[data-test="lastName"]').fill('LAst_Name');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('AB1 2CD');
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="shipping-info-value"]')).toContainText('Free Pony Express Delivery!');
  await expect(page.locator('[data-test="total-label"]')).toContainText('Total: $32.39');
  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
  await page.locator('[data-test="back-to-products"]').click();

  await page.close() ;
  
});