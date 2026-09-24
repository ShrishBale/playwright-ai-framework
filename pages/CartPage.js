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
  }

  async openCart() {
    await this.cartLink.click();
  }

  async expectItemCount(expectedCount) {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}
