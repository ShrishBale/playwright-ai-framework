import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);

    this.pageTitle = page.locator('h1');
    this.mainContent = page.locator('main');
    this.primaryButton = page.locator('button').first();
  }

  async openHomePage() {
    await this.goto('/');
  }

  async expectPageTitle(text) {
    await this.pageTitle.waitFor({ state: 'visible' });
    await this.pageTitle.toContainText(text);
  }
}
