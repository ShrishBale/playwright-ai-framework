import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { HomePage } from '../pages/HomePage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { SidebarPage } from '../pages/SidebarPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { AuthService } from '../services/AuthService.js';
import users from '../test-data/users.json' with { type: 'json' };

// Fixtures are a Playwright pattern for providing reusable objects to every test.
// Instead of creating page objects manually in each test, we tell Playwright to build them automatically.
export const test = base.extend({
  // This fixture exposes a LoginPage instance to each test.
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  // This fixture exposes the inventory page object.
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  // This fixture exposes a home page object if needed for generic UI flows.
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  // This fixture exposes the product page object.
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  // This fixture exposes the sidebar menu helpers.
  sidebarPage: async ({ page }, use) => {
    await use(new SidebarPage(page));
  },

  // This fixture exposes the cart page object.
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  // This fixture exposes the checkout page object.
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  // This fixture exposes a reusable authentication service.
  authService: async ({ page }, use) => {
    await use(new AuthService(page));
  },

  // This fixture logs in a valid user automatically for tests that need an authenticated session.
  validUserSession: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await use(page);
  },
});

export { expect };
