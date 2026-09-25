import fs from 'fs';
import path from 'path';
import { config } from '../utils/config.js';

// BasePage is the shared foundation for every page object.
// It keeps common actions like navigation and waiting in one place.
export class BasePage {
  static runFolder = null;

  constructor(page, baseUrl = config.baseURL) {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  sanitizeStepName(stepName) {
    return (stepName || 'step')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'step';
  }

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

  async takeStepScreenshot(stepName, specName = 'general', options = {}) {
    const screenshotPath = this.getScreenshotPath(stepName, specName);
    await this.page.screenshot({
      path: screenshotPath,
      fullPage: false,
      ...options,
    });
    return screenshotPath;
  }

  async goto(path = '/', stepName = 'page-open', specName = 'general') {
    const url = path.startsWith('http') ? path : `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
    await this.takeStepScreenshot(stepName, specName);
  }

  async waitForVisible(locator, timeout = config.defaultTimeout) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async click(locator, stepName = 'click', specName = 'general') {
    await locator.click();
    await this.takeStepScreenshot(stepName, specName);
  }

  async fill(locator, value, stepName = 'fill', specName = 'general') {
    await locator.fill(value);
    await this.takeStepScreenshot(stepName, specName);
  }
}
