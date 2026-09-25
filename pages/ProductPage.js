import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

// ProductPage manages the product list and product actions.
export class ProductPage extends BasePage {
  constructor(page) {
    super(page);

    this.productList = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrice = page.locator('.inventory_item_price');
    this.addToCartButton = page.locator('.btn_inventory').first();
  }

  async expectProductsDisplayed(expectedCount = 6) {
    await this.productList.first().waitFor({ state: 'visible' });
    await expect(this.productList).toHaveCount(expectedCount);
  }

  async openFirstProduct(specName = 'general') {
    await this.productNames.first().click();
    await this.takeStepScreenshot('first-product-opened', specName);
  }

  async addFirstProductToCart(specName = 'general') {
    await this.addToCartButton.click();
    await this.takeStepScreenshot('first-product-added-to-cart', specName);
  }
}
