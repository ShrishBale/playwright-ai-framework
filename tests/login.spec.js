import { test, expect } from '../utils/fixtures.js';
import { getUser } from '../utils/testData.js';

test.describe('Login feature', () => {
  test('user can login with valid credentials', async ({ page, loginPage }) => {
    const validUser = getUser('validUser');

    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);

    await loginPage.expectInventoryVisible();
    await expect(page).toHaveURL(/inventory/);
  });

  test('user sees error for locked account', async ({ loginPage }) => {
    const lockedUser = getUser('lockedUser');

    await loginPage.goto();
    await loginPage.login(lockedUser.username, lockedUser.password);

    await loginPage.expectLoginError('Epic sadface: Sorry, this user has been locked out.');
  });

  test('user sees error for invalid credentials', async ({ loginPage }) => {
    const invalidUser = getUser('invalidUser');

    await loginPage.goto();
    await loginPage.login(invalidUser.username, invalidUser.password);

    await loginPage.expectLoginError('Epic sadface: Username and password do not match any user in this service');
  });
});
