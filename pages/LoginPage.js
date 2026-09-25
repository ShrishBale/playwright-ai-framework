import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

// LoginPage stores all login-related selectors and actions in one place.
// This keeps the tests cleaner and easier to read.
export class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    // These are the important elements for the login screen.
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
    this.inventoryContainer = page.locator('.inventory_list');
  }

  async goto() {
    // Open the app home page before running login steps.
    await super.goto('/');
  }

  async login(username, password, specName = 'general') {
    // Fill in credentials and submit the form.
    await this.usernameInput.fill(username);
    await this.takeStepScreenshot('username-filled', specName);

    await this.passwordInput.fill(password);
    await this.takeStepScreenshot('password-filled', specName);

    await this.loginButton.click();
    await this.takeStepScreenshot('login-button-clicked', specName);
  }

  async loginAs(username, password, specName = 'general') {
    // Reusable helper: open page first, then log in.
    await this.goto(undefined, 'page-open', specName);
    await this.login(username, password, specName);
  }

  async expectLoginError(message) {
    // Check that the error appears and contains the expected text.
    await this.errorMessage.waitFor({ state: 'visible' });
    await expect(this.errorMessage).toContainText(message);
  }

  async expectInventoryVisible() {
    // After successful login, the inventory list should appear.
    await this.inventoryContainer.waitFor({ state: 'visible' });
  }
}

