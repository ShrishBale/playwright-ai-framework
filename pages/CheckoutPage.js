import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

// CheckoutPage is responsible for all steps in the purchase flow after the cart is ready.
// This keeps the checkout logic away from the test files so they stay readable.
export class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);

    // These are the form fields and buttons for the checkout information page.
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.zipInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.confirmationText = page.locator('.complete-header');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Fill customer details and continue to the next checkout step.
  async fillCustomerInfo(firstName, lastName, zipCode, specName = 'general') {
    await this.firstNameInput.fill(firstName);
    await this.takeStepScreenshot('first-name-filled', specName);

    await this.lastNameInput.fill(lastName);
    await this.takeStepScreenshot('last-name-filled', specName);

    await this.zipInput.fill(zipCode);
    await this.takeStepScreenshot('postal-code-filled', specName);

    await this.continueButton.click();
    await this.takeStepScreenshot('continue-button-clicked', specName);
  }

  // Finish the checkout by clicking the final confirmation button.
  async finishCheckout(specName = 'general') {
    await this.finishButton.click();
    await this.takeStepScreenshot('finish-button-clicked', specName);
  }

  // Assert the success message after the order is placed.
  async expectOrderConfirmed(specName = 'general') {
    await expect(this.confirmationText).toContainText('Thank you for your order!');
    await this.takeStepScreenshot('order-confirmed', specName);
  }

  async expectCheckoutError(message, specName = 'general') {
    await expect(this.errorMessage).toContainText(message);
    await this.takeStepScreenshot('checkout-validation-error', specName);
  }
}
