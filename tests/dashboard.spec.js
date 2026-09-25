import path from 'path';
import { test, expect } from '../utils/fixtures.js';
import { getUser } from '../utils/testData.js';
import { BasePage } from '../pages/BasePage.js';

test.describe('Dashboard feature', () => {
  const specName = 'dashboard.spec.js';
  const scriptFolder = path.join(BasePage.createRunFolder(), 'dashboard');

  test('dashboard loads product items after login', async ({ page, loginPage, inventoryPage }) => {
    const validUser = getUser('validUser');

    await loginPage.goto('/', 'page-open', specName);
    await loginPage.takeStepScreenshot('dashboard-login-page', specName);

    await loginPage.login(validUser.username, validUser.password, specName);
    await loginPage.takeStepScreenshot('dashboard-login-submitted', specName);

    await inventoryPage.expectProductsVisible();
    await inventoryPage.takeStepScreenshot('dashboard-products-visible', specName);

    await expect(page.locator('.title')).toContainText('Products');
    await inventoryPage.takeStepScreenshot('dashboard-title-verified', specName);
  });

  test('user can open a product item', async ({ page, loginPage }) => {
    const validUser = getUser('validUser');

    await loginPage.goto('/', 'page-open', specName);
    await loginPage.takeStepScreenshot('product-page-login', specName);

    await loginPage.login(validUser.username, validUser.password, specName);
    await loginPage.takeStepScreenshot('product-page-login-submitted', specName);

    await page.locator('.inventory_item_name').first().click();
    await page.screenshot({ path: path.join(scriptFolder, 'product-item-clicked.png') });

    await expect(page).toHaveURL(/inventory-item/);
    await page.screenshot({ path: path.join(scriptFolder, 'product-detail-url-verified.png') });
  });
});
