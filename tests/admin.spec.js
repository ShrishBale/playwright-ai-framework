import { test, expect } from '../utils/fixtures.js';
import { getUser } from '../utils/testData.js';

// This test file covers admin access and logout behavior.
// A describe block groups related tests together so the suite stays organized and readable.
test.describe('Admin feature', () => {
  // This name tells the screenshot helper which script folder to store images under.
  const specName = 'admin.spec.js';

  test('admin user can access the inventory page', async ({ page, loginPage, inventoryPage }) => {
    // Get the admin credentials from the test-data file.
    const adminUser = getUser('adminUser');

    // Load the login page and capture the starting point.
    await loginPage.goto('/', 'page-open', specName);
    await loginPage.takeStepScreenshot('admin-login-page', specName);

    // Sign in using the admin credentials.
    await loginPage.login(adminUser.username, adminUser.password, specName);
    await loginPage.takeStepScreenshot('admin-login-submitted', specName);

    // Verify the product list is visible after login.
    await inventoryPage.expectProductsVisible();
    await inventoryPage.takeStepScreenshot('admin-inventory-visible', specName);

    // Check the inventory container is actually visible on the page.
    await expect(page.locator('.inventory_list')).toBeVisible();
    await inventoryPage.takeStepScreenshot('admin-inventory-verified', specName);
  });

  test('user can log out from inventory page', async ({ page, loginPage, inventoryPage, sidebarPage }) => {
    // Use a normal valid user for the logout scenario.
    const validUser = getUser('validUser');

    // Open the login page again before logging in.
    await loginPage.goto('/', 'page-open', specName);
    await loginPage.takeStepScreenshot('logout-login-page', specName);

    // Log in to reach the inventory page.
    await loginPage.login(validUser.username, validUser.password, specName);
    await loginPage.takeStepScreenshot('logout-login-submitted', specName);

    // Open the sidebar menu and click logout.
    await sidebarPage.logout(specName);
    await sidebarPage.takeStepScreenshot('logout-action-complete', specName);

    // Verify the user is redirected back to the login page.
    await expect(page).toHaveURL(/https:\/\/www\.saucedemo\.com\/?$/);
    await sidebarPage.takeStepScreenshot('logout-url-verified', specName);
  });

  test('logged-out user cannot access inventory directly', async ({ page, loginPage, sidebarPage }) => {
    // Log in first so the test can verify access is removed after logout.
    const validUser = getUser('validUser');

    await loginPage.goto('/', 'page-open', specName);
    await loginPage.login(validUser.username, validUser.password, specName);
    await sidebarPage.logout(specName);

    // Try to open the protected inventory route after logging out.
    await page.goto('/inventory.html');
    await page.waitForLoadState('domcontentloaded');
    await loginPage.takeStepScreenshot('protected-inventory-redirected', specName);

    // The application should send the logged-out user back to the login page.
    await expect(page).toHaveURL(/https:\/\/www\.saucedemo\.com\/?$/);
  });
});
