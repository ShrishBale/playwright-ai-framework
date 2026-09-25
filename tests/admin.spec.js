import { test, expect } from '../utils/fixtures.js';
import { getUser } from '../utils/testData.js';

test.describe('Admin feature', () => {
  const specName = 'admin.spec.js';

  test('admin user can access the inventory page', async ({ page, loginPage, inventoryPage }) => {
    const adminUser = getUser('adminUser');

    await loginPage.goto('/', 'page-open', specName);
    await loginPage.takeStepScreenshot('admin-login-page', specName);

    await loginPage.login(adminUser.username, adminUser.password, specName);
    await loginPage.takeStepScreenshot('admin-login-submitted', specName);

    await inventoryPage.expectProductsVisible();
    await inventoryPage.takeStepScreenshot('admin-inventory-visible', specName);

    await expect(page.locator('.inventory_list')).toBeVisible();
    await inventoryPage.takeStepScreenshot('admin-inventory-verified', specName);
  });

  test('user can log out from inventory page', async ({ page, loginPage, inventoryPage, sidebarPage }) => {
    const validUser = getUser('validUser');

    await loginPage.goto('/', 'page-open', specName);
    await loginPage.takeStepScreenshot('logout-login-page', specName);

    await loginPage.login(validUser.username, validUser.password, specName);
    await loginPage.takeStepScreenshot('logout-login-submitted', specName);

    await sidebarPage.logout(specName);
    await sidebarPage.takeStepScreenshot('logout-action-complete', specName);

    await expect(page).toHaveURL(/https:\/\/www\.saucedemo\.com\/?$/);
    await sidebarPage.takeStepScreenshot('logout-url-verified', specName);
  });
});
