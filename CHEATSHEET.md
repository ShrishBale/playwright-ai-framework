# Playwright AI Framework Cheat Sheet

This cheat sheet gives a quick, practical overview of how this Playwright framework is structured and how to work with it efficiently.

## 1. Project Goal

This project is a reusable UI automation framework for the SauceDemo demo app. It follows a clean test architecture with page objects, fixtures, and shared utilities.

It helps you:

- keep selectors and interactions in one place
- reuse login and flow logic across tests
- reduce duplication in test specs
- organize screenshots by run and feature
- scale from small examples to larger test suites

---

## 2. Repository Structure

```text
playwright-ai-framework/
├── pages/
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── ProductPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── DashboardPage.js
│   ├── HomePage.js
│   └── SidebarPage.js
├── tests/
│   ├── login.spec.js
│   ├── dashboard.spec.js
│   ├── admin.spec.js
│   └── checkout.spec.js
├── utils/
│   ├── config.js
│   ├── fixtures.js
│   ├── helpers.js
│   ├── testData.js
│   ├── reporting.js
│   └── testHooks.js
├── services/
│   └── AuthService.js
├── test-data/
│   └── users.json
├── screenshots/
├── playwright-report/
├── test-results/
├── playwright.config.js
├── package.json
├── README.md
├── CHEATSHEET.md
└── package-lock.json
```

---

## 3. What Each Folder Does

### pages/
Contains page object classes for app screens and reusable UI actions.

Examples:

- `BasePage.js` holds generic browser/page methods
- `LoginPage.js` handles login form interactions and assertions
- `InventoryPage.js` covers product listing actions
- `CartPage.js` and `CheckoutPage.js` handle purchase flow steps
- `SidebarPage.js` covers menu and navigation helpers

### tests/
Contains feature tests written as Playwright specs.

Examples:

- `login.spec.js` covers valid and invalid login scenarios
- `checkout.spec.js` covers the cart and checkout journey
- `dashboard.spec.js` and `admin.spec.js` cover additional app flows

### utils/
Contains reusable framework infrastructure.

Examples:

- `config.js` centralizes environment variables and defaults
- `fixtures.js` exposes page objects and shared test fixtures
- `testData.js` loads user and test data helpers
- `helpers.js` contains reusable helper functions
- `reporting.js` and `testHooks.js` support reporting and lifecycle behavior

### services/
Contains business logic separated from raw UI actions.

Example:

- `AuthService.js` handles login logic through a service layer rather than repeating UI steps in every test

### screenshots/
Stores screenshots grouped by run date and feature folder.

Example layout:

```text
screenshots/
  Iteration_09_30_2026_14_47_24/
    login/
    checkout/
    dashboard/
    admin/
```

---

## 4. Core Patterns Used in This Repo

### Page Object Model

Tests should not directly contain repeated selectors or page actions. Instead, logic belongs in page objects.

```js
export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
  }
}
```

Usage:

```js
await loginPage.goto('/');
await loginPage.login(username, password);
```

### Fixtures

`utils/fixtures.js` creates reusable Playwright fixtures so each test can receive ready-to-use page objects.

```js
export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});
```

This makes tests cleaner and reduces setup duplication.

### Configuration

`utils/config.js` defines the default environment and browser settings:

```js
export const config = {
  environment: process.env.ENV || 'dev',
  baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
  defaultTimeout: Number(process.env.DEFAULT_TIMEOUT || 15000),
  headless: process.env.HEADLESS !== 'false',
  browserName: process.env.BROWSER || 'chromium',
};
```

---

## 5. Typical Test Flow

A standard test usually follows this pattern:

```js
import { test, expect } from '../utils/fixtures.js';

test('user can login with valid credentials', async ({ page, loginPage }) => {
  await loginPage.goto('/', 'page-open', 'login.spec.js');
  await loginPage.login('standard_user', 'secret_sauce', 'login.spec.js');
  await expect(page).toHaveURL(/inventory/);
});
```

This keeps the test readable while the page object handles the details.

---

## 6. How to Run Tests

From the repo root:

```powershell
npm test
```

Run headed mode:

```powershell
npm run test:headed
```

Open Playwright UI mode:

```powershell
npm run test:ui
```

Run only one file:

```powershell
npx playwright test tests/login.spec.js --project=chromium --workers=1
```

Run by test name:

```powershell
npx playwright test -g "user can login with valid credentials"
```

Debug interactively:

```powershell
npx playwright test --debug
```

Open HTML report:

```powershell
npx playwright show-report
```

---

## 7. Useful Playwright Commands

### Run all tests
```powershell
npx playwright test
```

### Run one browser project
```powershell
npx playwright test --project=chromium
```

### Run one spec file
```powershell
npx playwright test tests/checkout.spec.js
```

### Run in headed browser
```powershell
npx playwright test --headed
```

### Generate a test from browser actions
```powershell
npx playwright codegen https://www.saucedemo.com
```

### Show the last HTML report
```powershell
npx playwright show-report
```

---

## 8. Best Practices for This Repo

- Put selectors inside page object classes, not in test files
- Reuse fixtures instead of recreating page objects in every test
- Keep test names descriptive and user-focused
- Use screenshot naming that matches the action or scenario
- Store user data in `test-data/users.json`
- Prefer environmental configuration over hardcoded URLs and waits

---

## 9. Quick Reference

Key files to know:

- `utils/config.js` - base config and env values
- `utils/fixtures.js` - shared fixture wiring
- `pages/BasePage.js` - common browser/page methods
- `pages/LoginPage.js` - login interactions and validations
- `services/AuthService.js` - reusable auth flow logic
- `test-data/users.json` - valid and invalid credentials

This project is intentionally structured to stay readable and extension-friendly while demonstrating solid automation habits.

## 9. Screenshot Strategy in This Project

This project stores screenshots in a structured folder format.

The rule is:

1. Create an iteration folder for each test run
2. Create a subfolder for each script file
3. Save screenshots inside that script folder

Example:

```text
screenshots/
  Iteration_09_25_2026_11_18_06/
    login/
      login-page-loaded.png
      login-button-clicked.png
```

This makes debugging easier because you can see:
- which run it came from
- which script created it
- which action happened at that point

---

## 10. Why Screenshots Help

Screenshots are useful for:
- debugging failed scripts
- reviewing UI state after each action
- verifying login, cart, checkout, and logout flows
- documenting automation progress

They also help in interviews and portfolio work because they show a clear visual record of the automation.

---

## 11. Example Flow

A typical test uses this pattern:

```js
await loginPage.goto();
await loginPage.login(username, password);
await inventoryPage.expectProductsVisible();
await expect(page).toHaveURL(/inventory/);
```

This means:
- open login page
- enter username and password
- click login
- verify inventory page loads

---

## 12. Best Practices for This Project

- Keep selectors in page objects
- Keep tests readable and short
- Reuse methods instead of duplicating steps
- Use helpful screenshot names for each action
- Keep one browser for consistency unless needed otherwise
- Separate UI actions from business logic

---

## 13. Interview-Friendly Explanation

A strong answer for interviews:

> This project uses Playwright with the Page Object Model. Each page is represented by a class, shared logic lives in BasePage, and fixtures provide reusable objects to each test. The project keeps tests readable, reduces duplication, and organizes screenshots by test iteration and script name, making debugging and reporting easier.

---

## 14. Quick Learning Tips

If you are learning, focus on these 5 things:
1. `test.describe()` groups tests
2. page objects hold selectors and actions
3. fixtures inject shared objects into tests
4. `expect()` drives assertions
5. screenshot organization helps debugging

---

## 15. Useful File References

- [playwright.config.js](playwright.config.js)
- [pages/BasePage.js](pages/BasePage.js)
- [pages/LoginPage.js](pages/LoginPage.js)
- [pages/CheckoutPage.js](pages/CheckoutPage.js)
- [utils/fixtures.js](utils/fixtures.js)
- [tests/login.spec.js](tests/login.spec.js)

---

## 16. Final Summary

This project is a beginner-friendly Playwright framework with:
- page object model
- reusable fixtures
- readable tests
- structured screenshot directories
- Chrome-only execution for simpler debugging

It is a strong learning project and a nice resume/interview example because it shows real-world automation patterns in a clean structure.
