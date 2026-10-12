# Playwright AI Framework

A reusable Playwright test automation framework built around the Page Object Model, reusable fixtures, and service-layer abstractions. The project is designed to demonstrate clean architecture, readable automation code, and scalable test organization for web application testing.

## Overview

This framework is built to support modern UI automation with:

- Page Object Model for maintainable selectors and actions
- Reusable fixtures for shared test dependencies
- Centralized configuration for environment and browser setup
- Data-driven user scenarios from JSON files
- Screenshot capture per test step and per spec file
- Clear separation between UI actions, business logic, and test cases

It is suitable for learning, demos, interview prep, and extending into larger automation suites.

## Tech Stack

- Playwright Test
- JavaScript (ES modules)
- Page Object Model design
- JSON-based test data
- HTML and screenshot reports

## Project Structure

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
├── CHEATSHEET.md
├── README.md
└── package-lock.json
```

## Core Design Principles

- Keep selectors and UI flows in page objects
- Keep business flows readable in the test specification files
- Centralize configuration and environment defaults in `utils/config.js`
- Reuse fixtures instead of repeating setup logic
- Separate higher-level business actions from raw page interactions
- Capture screenshots for debugging and reporting

## Quick Start

Install dependencies:

```bash
npm install
```

Run the full suite:

```bash
npm test
```

Run tests in headed mode:

```bash
npm run test:headed
```

Open the Playwright UI runner:

```bash
npm run test:ui
```

Run a single spec file:

```bash
npx playwright test tests/login.spec.js --project=chromium --workers=1
```

Open the generated HTML report:

```bash
npx playwright show-report
```

## Environment Configuration

The framework reads environment variables defined in the shell or CI job. Default values are configured in `utils/config.js`.

Supported values include:

- `ENV` - environment name, default `dev`
- `BASE_URL` - app base URL, default `https://www.saucedemo.com`
- `BROWSER` - browser name, default `chromium`
- `HEADLESS` - whether Playwright runs in headless mode, default `true`
- `DEFAULT_TIMEOUT` - default wait timeout in milliseconds, default `15000`

Example:

```bash
BASE_URL=https://www.saucedemo.com BROWSER=chromium HEADLESS=true npx playwright test
```

## Application Flow

The default app under test is SauceDemo. Typical flows include:

1. Navigate to the login page
2. Authenticate using valid or invalid user data
3. Assert expected page state
4. Interact with inventory, cart, or checkout flows
5. Capture screenshots to validate each user action

## Included Features

- Login validation tests
- Inventory and dashboard page coverage
- Sidebar and navigation interactions
- Cart and checkout examples
- Reusable service layer for authentication
- Reporting and screenshot output for each run

## Recommended Usage Pattern

The framework follows a simple and scalable pattern:

- Page classes live in `pages/`
- Test flows live in `tests/`
- Shared setup and helpers live in `utils/`
- Business logic such as logins lives in `services/`
- Test data is stored in `test-data/`

This keeps the suite maintainable as the application grows.

## Summary

This project demonstrates a practical Playwright framework structure suitable for learning, interviews, and real-world UI automation. It emphasizes maintainability, readability, reusable patterns, and organized test execution while remaining easy to extend for new features and applications.
