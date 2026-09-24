import { test, expect } from '../utils/fixtures.js';
import { getUser } from '../utils/testData.js';

test.describe('Admin feature', () => {
  test('admin user can access the inventory page', async ({ page, loginPage, inventoryPage }) => {
    const adminUser = getUser('adminUser');

    await loginPage.goto();
    await loginPage.login(adminUser.username, adminUser.password);

    await inventoryPage.expectProductsVisible();
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('user can log out from inventory page', async ({ page, loginPage, inventoryPage, sidebarPage }) => {
    const validUser = getUser('validUser');

    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);

    await sidebarPage.logout();

    await expect(page).toHaveURL(/https:\/\/www\.saucedemo\.com\/?$/);
  });
});
