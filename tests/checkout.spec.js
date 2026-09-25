import path from 'path';
import { test, expect } from '../utils/fixtures.js';
import { getUser } from '../utils/testData.js';
import { BasePage } from '../pages/BasePage.js';

// This sample test demonstrates how a complete feature flow should be written.
// The test stays readable because each page object handles its own UI actions.
test.describe('Checkout flow', () => {
  const specName = 'checkout.spec.js';
  const scriptFolder = path.join(BasePage.createRunFolder(), 'checkout');

  test('user can complete checkout with valid data', async ({ page, loginPage, productPage, cartPage, checkoutPage }) => {
    const user = getUser('validUser');

    // Step 1: log in with a valid user.
    await loginPage.goto('/', 'page-open', specName);
    await loginPage.takeStepScreenshot('checkout-login-page', specName);

    await loginPage.login(user.username, user.password, specName);
    await loginPage.takeStepScreenshot('checkout-login-submitted', specName);

    // Step 2: add a product to the cart before checking out.
    await productPage.addFirstProductToCart(specName);
    await productPage.takeStepScreenshot('checkout-product-added', specName);

    // Step 3: open the cart and proceed to checkout.
    await cartPage.openCart(specName);
    await cartPage.takeStepScreenshot('checkout-cart-opened', specName);

    await expect(cartPage.cartItems).toHaveCount(1);
    await cartPage.takeStepScreenshot('checkout-cart-count-verified', specName);

    await cartPage.clickCheckout(specName);
    await cartPage.takeStepScreenshot('checkout-started', specName);

    // Step 4: fill form data and finish the order.
    await checkoutPage.fillCustomerInfo('Test', 'User', '12345', specName);
    await checkoutPage.takeStepScreenshot('checkout-form-filled', specName);

    await checkoutPage.finishCheckout(specName);
    await checkoutPage.takeStepScreenshot('checkout-finished', specName);

    await checkoutPage.expectOrderConfirmed(specName);
    await page.screenshot({ path: path.join(scriptFolder, 'checkout-confirmation-final.png') });
  });
});
