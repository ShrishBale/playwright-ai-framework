import { test, expect } from '../utils/fixtures.js';
import { getUser } from '../utils/testData.js';

test.describe('Dashboard feature', () => {
  test('dashboard loads product items after login', async ({ page, loginPage, inventoryPage }) => {
    const validUser = getUser('validUser');

    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);

    await inventoryPage.expectProductsVisible();
    await expect(page.locator('.title')).toContainText('Products');
  });

  test('user can open a product item', async ({ page, loginPage }) => {
    const validUser = getUser('validUser');

    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);

    await page.locator('.inventory_item_name').first().click();
    await expect(page).toHaveURL(/inventory-item/);
  });
});
