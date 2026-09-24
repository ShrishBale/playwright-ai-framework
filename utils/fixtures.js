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

// This file defines reusable fixtures for the framework.
// Each fixture gives tests a ready-to-use page object or service.
export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  sidebarPage: async ({ page }, use) => {
    await use(new SidebarPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  authService: async ({ page }, use) => {
    await use(new AuthService(page));
  },

  validUserSession: async ({ page }, use) => {
    // Quick login fixture for tests that need an already authenticated session.
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await use(page);
  },
});

export { expect };
