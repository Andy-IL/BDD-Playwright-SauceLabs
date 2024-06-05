import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  // add to trolley
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  // remove from trolley
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  // back to Products
  await page.locator('[data-test="continue-shopping"]').click();
  await page.locator('[data-test="checkout"]').click();
  // checkout page 1 
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('Ahoy');
  await page.locator('[data-test="firstName"]').press('Tab');
  await page.locator('[data-test="lastName"]').fill('There');
  await page.locator('[data-test="lastName"]').press('Tab');
  await page.locator('[data-test="postalCode"]').fill('KT22 9NB');
  await page.locator('[data-test="postalCode"]').press('Tab');
  // check cancel button 
  await page.locator('[data-test="cancel"]').click({
    button: 'right'
  });
  await page.locator('[data-test="continue"]').click();
  // checkout page 2
  await page.locator('[data-test="subtotal-label"]').click();
  await page.locator('[data-test="tax-label"]').click();
  await page.locator('[data-test="total-label"]').click();
  await page.locator('[data-test="finish"]').click();
  // Back to Products 
  await page.locator('[data-test="back-to-products"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  // REMOVE showing button locator
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click({
    button: 'right'
  });
});