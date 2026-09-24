import { test as base } from '@playwright/test';

// This file contains framework-level hooks that run before and after each test.
// It helps keep test setup consistent across pages and features.

export const test = base.extend({
  // Example pattern: we can add shared setup for every test later.
  // For now, this file acts as a place for global hooks and app-wide setup.
  // You can add beforeEach, afterEach, or custom fixtures here as the framework grows.
});
