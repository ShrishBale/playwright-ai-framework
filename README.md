# Playwright AI Framework

A beginner-friendly, reusable Playwright automation framework built to demonstrate clean test architecture, maintainability, and scalability for modern web application testing.

## Overview

This project applies core automation principles such as:

- Page Object Model (POM)
- Reusable fixtures and shared setup
- Centralized configuration
- Data-driven test inputs
- Browser-agnostic automation patterns
- Clear separation between test logic and UI actions

The goal is to provide a clean foundation that can be extended for real-world web applications and used as a learning/demo project for automation interviews.

## Project Structure

- `pages/` - Page object classes for app screens and UI actions
- `tests/` - Feature-based end-to-end test cases
- `test-data/` - JSON-based test inputs for users and scenarios
- `utils/` - Shared helpers, fixtures, environment config, and reporting utilities
- `services/` - Higher-level business flows such as authentication
- `playwright.config.js` - Browser and Playwright test configuration
- `.env.example` - Template for environment variables

## Framework Principles

- Keep selectors and UI logic inside page objects
- Keep business flows readable in test files
- Centralize environment values and reusable logic
- Reuse fixtures to reduce duplication
- Focus on stable, user-centric locators and assertions
- Make the framework easy to extend for new features

## Example Flow

1. Open the application
2. Log in using a valid or invalid user
3. Assert expected page state
4. Perform feature actions such as product listing, cart, sidebar, or checkout
5. Validate end-user outcomes

## How to Run

Install dependencies:

```bash
npm install
```

Run the full suite:

```bash
npm test
```

Run in headed mode:

```bash
npm run test:headed
```

Open Playwright UI mode:

```bash
npm run test:ui
```

## Environment Setup

Copy the example file and configure your values:

```bash
copy .env.example .env
```

Then update values like:

- `BASE_URL`
- `BROWSER`
- `HEADLESS`
- `DEFAULT_TIMEOUT`

## Features Included

- Login validation tests
- Inventory/dashboard checks
- Sidebar navigation and logout flow
- Checkout flow example
- Reusable utility and fixture layer
- Multi-browser Playwright setup

## Future Enhancements

- Add more page objects for additional application pages
- Add environment-specific configuration for dev/qa/prod
- Add API testing helpers
- Introduce custom logger/reporting utilities
- Add CI/CD configuration for automated runs
- Expand test coverage with edge cases and regression scenarios

## Summary

This project demonstrates a clean, scalable Playwright framework structure suitable for learning, demo purposes, and technical interviews. It emphasizes maintainability, reuse, and testing best practices while remaining easy to understand and extend.
