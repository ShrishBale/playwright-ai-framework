export async function waitForUrl(page, expectedUrlPattern, timeout = 15000) {
  await page.waitForURL(expectedUrlPattern, { timeout });
}

export async function assertPageLoaded(page) {
  await page.waitForLoadState('domcontentloaded');
}

export function isTruthy(value) {
  return value === true || value === 'true';
}
