import { test, expect } from '../utils/fixtures.js';
import { getUser } from '../utils/testData.js';

test.describe('Login feature', () => {
  const specName = 'login.spec.js';

  test('user can login with valid credentials', async ({ page, loginPage }) => {
    const validUser = getUser('validUser');

    await loginPage.goto('/', 'page-open', specName);
    await loginPage.takeStepScreenshot('login-page-loaded', specName);

    await loginPage.login(validUser.username, validUser.password, specName);
    await loginPage.takeStepScreenshot('login-form-submitted', specName);

    await loginPage.expectInventoryVisible();
    await loginPage.takeStepScreenshot('inventory-verified-after-login', specName);

    await expect(page).toHaveURL(/inventory/);
    await loginPage.takeStepScreenshot('inventory-url-verified', specName);
  });

  test('user sees error for locked account', async ({ page, loginPage }) => {
    const lockedUser = getUser('lockedUser');

    await loginPage.goto('/', 'page-open', specName);
    await loginPage.takeStepScreenshot('locked-user-login-page', specName);

    await loginPage.login(lockedUser.username, lockedUser.password, specName);
    await loginPage.takeStepScreenshot('locked-user-login-attempt', specName);

    await loginPage.expectLoginError('Epic sadface: Sorry, this user has been locked out.');
    await loginPage.takeStepScreenshot('locked-user-error-verified', specName);

    await expect(page).toHaveURL(/https:\/\/www\.saucedemo\.com\/\??$/);
    await loginPage.takeStepScreenshot('locked-user-page-still-on-login', specName);
  });

  test('user sees error for invalid credentials', async ({ page, loginPage }) => {
    const invalidUser = getUser('invalidUser');

    await loginPage.goto('/', 'page-open', specName);
    await loginPage.takeStepScreenshot('invalid-user-login-page', specName);

    await loginPage.login(invalidUser.username, invalidUser.password, specName);
    await loginPage.takeStepScreenshot('invalid-user-login-attempt', specName);

    await loginPage.expectLoginError('Epic sadface: Username and password do not match any user in this service');
    await loginPage.takeStepScreenshot('invalid-user-error-verified', specName);

    await expect(page).toHaveURL(/https:\/\/www\.saucedemo\.com\/\??$/);
    await loginPage.takeStepScreenshot('invalid-user-page-still-on-login', specName);
  });
});
