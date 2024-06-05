import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="password"]').press('Tab');
  await page.locator('[data-test="login-button"]').click();
  // Add product
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');
  await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('2');
  await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toContainText('Remove');
  // To Cart page
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toContainText('Remove');
  // to checkout 
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('aaa');
  await page.locator('[data-test="firstName"]').press('Tab');
  await page.locator('[data-test="lastName"]').fill('bbb');
  await page.locator('[data-test="lastName"]').press('Tab');
  await page.locator('[data-test="postalCode"]').fill('KT22');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="subtotal-label"]').click({
    button: 'right'
  });
  await page.locator('[data-test="subtotal-label"]').click();
  await expect(page.locator('[data-test="subtotal-label"]')).toContainText('Item total: $59.980000000000004');
  await expect(page.locator('[data-test="tax-label"]')).toContainText('Tax: $4.80');
  await expect(page.locator('[data-test="total-label"]')).toContainText('Total: $64.78');
  await page.locator('[data-test="cancel"]').click();
  await page.locator('[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]').click();
});