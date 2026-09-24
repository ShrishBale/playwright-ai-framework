import { config } from '../utils/config.js';

// BasePage is the shared foundation for every page object.
// It keeps common actions like navigation and waiting in one place.
export class BasePage {
  constructor(page, baseUrl = config.baseURL) {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  async goto(path = '/') {
    const url = path.startsWith('http') ? path : `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForVisible(locator, timeout = config.defaultTimeout) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async click(locator) {
    await locator.click();
  }

  async fill(locator, value) {
    await locator.fill(value);
  }
}
