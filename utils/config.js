// This config file holds environment variables and framework defaults.
// Keeping them here makes the project reusable for different apps and environments.
export const config = {
  environment: process.env.ENV || 'dev',
  baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
  defaultTimeout: Number(process.env.DEFAULT_TIMEOUT || 15000),
  headless: process.env.HEADLESS !== 'false',
  browserName: process.env.BROWSER || 'chromium',
};

export function getBaseUrl(path = '') {
  // Build a clean URL using the configured application base URL.
  const safePath = path.startsWith('/') ? path : `/${path}`;
  return `${config.baseURL}${safePath}`;
}
