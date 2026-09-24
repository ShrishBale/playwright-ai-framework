import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

// CheckoutPage is a common page object for checking out a cart.
// This helps keep checkout-related steps separated from the rest of the app tests.
export class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);

    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.zipInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.confirmationText = page.locator('.complete-header');
  }

  async fillCustomerInfo(firstName, lastName, zipCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipInput.fill(zipCode);
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async expectOrderConfirmed() {
    await expect(this.confirmationText).toContainText('Thank you for your order!');
  }
}
