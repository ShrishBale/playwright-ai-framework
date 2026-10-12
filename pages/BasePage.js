import fs from 'fs';
import path from 'path';
import { config } from '../utils/config.js';

// BasePage is the shared foundation for all page objects in this framework.
// Instead of repeating the same actions in every page class, we put them here once.
// This keeps the code reusable and easier to understand for beginners.
export class BasePage {
  // runFolder stores the current test-run folder so all screenshots from one run go together.
  static runFolder = null;

  constructor(page, baseUrl = config.baseURL) {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  // This method cleans a step name so it can be used safely as a file name.
  // Example: 'login button clicked' becomes 'login-button-clicked'.
  sanitizeStepName(stepName) {
    return (stepName || 'step')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'step';
  }

  // This creates a new folder for each iteration of the test run.
  // Example: screenshots/Iteration_09_25_2026_11_18_06
  static createRunFolder() {
    if (!BasePage.runFolder) {
      const now = new Date();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      const folderName = `Iteration_${month}_${day}_${year}_${hours}_${minutes}_${seconds}`;
      BasePage.runFolder = path.join(process.cwd(), 'screenshots', folderName);
      fs.mkdirSync(BasePage.runFolder, { recursive: true });
    }

    return BasePage.runFolder;
  }

  // This creates the final screenshot path based on the run folder and script name.
  // Example: screenshots/Iteration_.../login/login-page-loaded-123456789.png
  getScreenshotPath(stepName, specName = 'general') {
    const scriptName = String(specName || 'general')
      .replace(/\.spec\.js$/i, '')
      .replace(/\.test\.js$/i, '')
      .replace(/[^a-zA-Z0-9_-]+/g, '_');

    const runFolder = BasePage.createRunFolder();
    const scriptFolder = path.join(runFolder, scriptName || 'general');
    fs.mkdirSync(scriptFolder, { recursive: true });

    const safeStepName = this.sanitizeStepName(stepName);
    return path.join(scriptFolder, `${safeStepName}-${Date.now()}.png`);
  }

  // This method captures a screenshot right after a UI action or verification step.
  async takeStepScreenshot(stepName, specName = 'general', options = {}) {
    const screenshotPath = this.getScreenshotPath(stepName, specName);
    await this.page.screenshot({
      path: screenshotPath,
      fullPage: false,
      ...options,
    });
    return screenshotPath;
  }

  // Navigation helper: opens a URL and captures a screenshot for the page load.
  async goto(path = '/', stepName = 'page-open', specName = 'general') {
    const url = path.startsWith('http') ? path : `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
    await this.takeStepScreenshot(stepName, specName);
  }

  // This waits for a locator to be visible before continuing.
  async waitForVisible(locator, timeout = config.defaultTimeout) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  // Generic click method used by page objects when they need a click with screenshot logging.
  async click(locator, stepName = 'click', specName = 'general') {
    await locator.click();
    await this.takeStepScreenshot(stepName, specName);
  }

  // Generic fill method used when entering text fields and wanting a screenshot after entry.
  async fill(locator, value, stepName = 'fill', specName = 'general') {
    await locator.fill(value);
    await this.takeStepScreenshot(stepName, specName);
  }
}
