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
    this.detailsName = page.locator('.inventory_details_name');
    this.detailsPrice = page.locator('.inventory_details_price');
    this.detailsDescription = page.locator('.inventory_details_desc');
    this.detailsImage = page.locator('.inventory_details_img');
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

  async expectProductDetailsVisible(specName = 'general') {
    await expect(this.detailsName).toBeVisible();
    await expect(this.detailsPrice).toBeVisible();
    await expect(this.detailsDescription).toBeVisible();
    await expect(this.detailsImage).toBeVisible();
    await this.takeStepScreenshot('product-details-verified', specName);
  }
}
