import { BasePage } from './BasePage.js';

// SidebarPage manages the app menu on pages that expose the burger menu.
// This makes navigation actions reusable across multiple tests.
export class SidebarPage extends BasePage {
  constructor(page) {
    super(page);

    // Use the accessible button instead of a hidden DOM id.
    // The SauceDemo menu exposes a button named "Logout" once the menu is open.
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.menuContainer = page.locator('.bm-menu-wrap');
    this.logoutButton = page.getByRole('button', { name: 'Logout', exact: true });
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  async open(specName = 'general') {
    // Open the burger menu and wait for the actual sidebar container to be visible.
    await this.menuButton.click();
    await this.takeStepScreenshot('sidebar-menu-opened', specName);

    await this.menuContainer.waitFor({ state: 'visible', timeout: 15000 });
    await this.logoutButton.waitFor({ state: 'visible', timeout: 15000 });
  }

  async logout(specName = 'general') {
    // Reusable logout flow for any test that needs to sign out.
    await this.open(specName);
    await this.logoutButton.click();
    await this.takeStepScreenshot('logout-button-clicked', specName);
  }
}
