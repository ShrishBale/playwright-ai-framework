import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

// CartPage keeps all cart-related UI actions in one place.
// This is reusable for any app that has a shopping cart or basket screen.
export class CartPage extends BasePage {
  constructor(page) {
    super(page);

    this.cartBadge = page.locator('.shopping_cart_badge');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator('.cart_item');
    this.cartLink = page.locator('.shopping_cart_link');
    this.removeButtons = page.locator('[data-test^="remove-"]');
  }

  async openCart(specName = 'general') {
    await this.cartLink.click();
    await this.takeStepScreenshot('cart-opened', specName);
  }

  async expectItemCount(expectedCount, specName = 'general') {
    await expect(this.cartItems).toHaveCount(expectedCount);
    await this.takeStepScreenshot(`cart-items-verified-${expectedCount}`, specName);
  }

  async clickCheckout(specName = 'general') {
    await this.checkoutButton.click();
    await this.takeStepScreenshot('checkout-clicked', specName);
  }

  async removeFirstItem(specName = 'general') {
    await this.removeButtons.first().click();
    await this.takeStepScreenshot('first-cart-item-removed', specName);
  }
}
