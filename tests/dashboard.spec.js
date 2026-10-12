import path from 'path';
import { test, expect } from '../utils/fixtures.js';
import { getUser } from '../utils/testData.js';
import { BasePage } from '../pages/BasePage.js';

// This file tests the dashboard view after login.
// It verifies that the products are shown and that a user can open one product.
test.describe('Dashboard feature', () => {
  // This script name is used to keep the screenshots inside the dashboard folder.
  const specName = 'dashboard.spec.js';
  const scriptFolder = path.join(BasePage.createRunFolder(), 'dashboard');

  test('dashboard loads product items after login', async ({ page, loginPage, inventoryPage }) => {
    // Get a valid user from the dataset.
    const validUser = getUser('validUser');

    // Open the site and capture the login screen before the action.
    await loginPage.goto('/', 'page-open', specName);
    await loginPage.takeStepScreenshot('dashboard-login-page', specName);

    // Log in with valid credentials.
    await loginPage.login(validUser.username, validUser.password, specName);
    await loginPage.takeStepScreenshot('dashboard-login-submitted', specName);

    // Confirm the products list is visible on the dashboard.
    await inventoryPage.expectProductsVisible();
    await inventoryPage.takeStepScreenshot('dashboard-products-visible', specName);

    // Check the page title to confirm the correct screen is loaded.
    await expect(page.locator('.title')).toContainText('Products');
    await inventoryPage.takeStepScreenshot('dashboard-title-verified', specName);
  });

  test('user can sort products by price from low to high', async ({ loginPage, inventoryPage }) => {
    // Log in before changing the product sort order.
    const validUser = getUser('validUser');

    await loginPage.goto('/', 'page-open', specName);
    await loginPage.login(validUser.username, validUser.password, specName);

    // Select the low-to-high price option and verify the displayed prices.
    await inventoryPage.sortProducts('lohi', specName);
    await inventoryPage.expectPricesSortedAscending();
    await inventoryPage.takeStepScreenshot('product-prices-sorted-ascending', specName);
  });

  test('user can view product details', async ({ loginPage, productPage }) => {
    // Log in before opening a product details page.
    const validUser = getUser('validUser');

    await loginPage.goto('/', 'page-open', specName);
    await loginPage.login(validUser.username, validUser.password, specName);

    // Open the first product and verify its detail elements are displayed.
    await productPage.openFirstProduct(specName);
    await productPage.expectProductDetailsVisible(specName);
  });

  test('user can open a product item', async ({ page, loginPage }) => {
    // Load a valid user again for this product-navigation flow.
    const validUser = getUser('validUser');

    // Start from the login page before entering credentials.
    await loginPage.goto('/', 'page-open', specName);
    await loginPage.takeStepScreenshot('product-page-login', specName);

    // Sign in so the dashboard is available.
    await loginPage.login(validUser.username, validUser.password, specName);
    await loginPage.takeStepScreenshot('product-page-login-submitted', specName);

    // Click the first product item from the list.
    await page.locator('.inventory_item_name').first().click();
    await page.screenshot({ path: path.join(scriptFolder, 'product-item-clicked.png') });

    // Verify the app navigates to the product details page.
    await expect(page).toHaveURL(/inventory-item/);
    await page.screenshot({ path: path.join(scriptFolder, 'product-detail-url-verified.png') });
  });
});
