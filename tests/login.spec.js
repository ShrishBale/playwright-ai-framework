import { test, expect } from '../utils/fixtures.js';
import { getUser } from '../utils/testData.js';

// This test file covers the login flows.
// It checks success, locked-user error, and invalid-credentials error scenarios.
test.describe('Login feature', () => {
  // specName is used so screenshots are saved in the correct script folder.
  const specName = 'login.spec.js';

  test('user can login with valid credentials', async ({ page, loginPage }) => {
    // Get the valid login data from the JSON test data file.
    const validUser = getUser('validUser');

    // Open the login page and capture the starting state.
    await loginPage.goto('/', 'page-open', specName);
    await loginPage.takeStepScreenshot('login-page-loaded', specName);

    // Enter the correct username and password and submit the form.
    await loginPage.login(validUser.username, validUser.password, specName);
    await loginPage.takeStepScreenshot('login-form-submitted', specName);

    // Verify that the inventory page appears after successful login.
    await loginPage.expectInventoryVisible();
    await loginPage.takeStepScreenshot('inventory-verified-after-login', specName);

    // Confirm the URL contains the inventory route.
    await expect(page).toHaveURL(/inventory/);
    await loginPage.takeStepScreenshot('inventory-url-verified', specName);
  });

  test('user sees error for locked account', async ({ page, loginPage }) => {
    // Load the locked-user credentials from the dataset.
    const lockedUser = getUser('lockedUser');

    // Open the login screen before the failed attempt.
    await loginPage.goto('/', 'page-open', specName);
    await loginPage.takeStepScreenshot('locked-user-login-page', specName);

    // Try to log in with the locked account.
    await loginPage.login(lockedUser.username, lockedUser.password, specName);
    await loginPage.takeStepScreenshot('locked-user-login-attempt', specName);

    // Assert the locked-user error message and capture it.
    await loginPage.expectLoginError('Epic sadface: Sorry, this user has been locked out.');
    await loginPage.takeStepScreenshot('locked-user-error-verified', specName);

    // Check that the app stays on the login page after the error.
    await expect(page).toHaveURL(/https:\/\/www\.saucedemo\.com\/\??$/);
    await loginPage.takeStepScreenshot('locked-user-page-still-on-login', specName);
  });

  test('user sees error for invalid credentials', async ({ page, loginPage }) => {
    // Load the invalid credentials from the test data.
    const invalidUser = getUser('invalidUser');

    // Open the login page again.
    await loginPage.goto('/', 'page-open', specName);
    await loginPage.takeStepScreenshot('invalid-user-login-page', specName);

    // Submit wrong credentials to trigger the validation error.
    await loginPage.login(invalidUser.username, invalidUser.password, specName);
    await loginPage.takeStepScreenshot('invalid-user-login-attempt', specName);

    // Validate the error message shown to the user.
    await loginPage.expectLoginError('Epic sadface: Username and password do not match any user in this service');
    await loginPage.takeStepScreenshot('invalid-user-error-verified', specName);

    // Confirm the screen remains on the login route after the failed login.
    await expect(page).toHaveURL(/https:\/\/www\.saucedemo\.com\/\??$/);
    await loginPage.takeStepScreenshot('invalid-user-page-still-on-login', specName);
  });
});
