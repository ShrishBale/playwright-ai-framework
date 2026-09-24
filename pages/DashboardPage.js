import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  constructor(page) {
    super(page);

    this.inventoryList = page.locator('.inventory_list');
    this.productItems = page.locator('.inventory_item');
    this.title = page.locator('.title');
    this.firstProduct = page.locator('.inventory_item_name').first();
  }

  async openFirstProduct() {
    await this.firstProduct.click();
  }
}
