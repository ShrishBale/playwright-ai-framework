import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

// InventoryPage groups all product-list actions in one place.
// This keeps UI interaction logic out of the test files.
export class InventoryPage extends BasePage {
  constructor(page) {
    super(page);

    // Product page selectors.
    this.inventoryList = page.locator('.inventory_list');
    this.productItems = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.title = page.locator('.title');

    // Side menu selectors used for logout.
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutButton = page.locator('#logout_sidebar_link');
  }

  async expectProductsVisible() {
    // Verify the inventory page loaded correctly.
    await this.waitForVisible(this.inventoryList);
    await expect(this.productItems).toHaveCount(6);
  }

  async expectPageTitle(titleText) {
    // Common assertion for page headings.
    await this.waitForVisible(this.title);
    await expect(this.title).toContainText(titleText);
  }

  async openFirstProduct() {
    // Example helper for selecting the first product.
    await this.productNames.first().click();
  }

  async logout(specName = 'general') {
    // Open the menu, wait for logout to become visible, then click it.
    await this.menuButton.click();
    await this.takeStepScreenshot('menu-opened', specName);

    await this.logoutButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.logoutButton.click();
    await this.takeStepScreenshot('logout-clicked', specName);
  }
}
