import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

// LoginPage stores all selectors and actions related to the login screen.
// This page object keeps the tests focused on business behavior instead of low-level UI details.
export class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    // These are the key elements on the login page.
    // Each locator points to a real UI element in the SauceDemo app.
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
    this.inventoryContainer = page.locator('.inventory_list');
  }

  // This method opens the login page using the shared BasePage navigation helper.
  async goto() {
    await super.goto('/');
  }

  // This method performs the full login flow and captures screenshots after each action.
  async login(username, password, specName = 'general') {
    // Fill in the username field.
    await this.usernameInput.fill(username);
    await this.takeStepScreenshot('username-filled', specName);

    // Fill in the password field.
    await this.passwordInput.fill(password);
    await this.takeStepScreenshot('password-filled', specName);

    // Click the login button.
    await this.loginButton.click();
    await this.takeStepScreenshot('login-button-clicked', specName);
  }

  // This helper combines opening the page and completing login in one method.
  async loginAs(username, password, specName = 'general') {
    await this.goto(undefined, 'page-open', specName);
    await this.login(username, password, specName);
  }

  // This verifies that the error message appears and contains the expected text.
  async expectLoginError(message) {
    await this.errorMessage.waitFor({ state: 'visible' });
    await expect(this.errorMessage).toContainText(message);
  }

  // This verifies that the inventory area appears after a successful login.
  async expectInventoryVisible() {
    await this.inventoryContainer.waitFor({ state: 'visible' });
  }
}

