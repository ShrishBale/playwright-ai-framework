import path from 'path';
import { test, expect } from '../utils/fixtures.js';
import { getUser } from '../utils/testData.js';
import { BasePage } from '../pages/BasePage.js';

// This is the end-to-end checkout flow.
// It demonstrates a realistic purchase flow: login -> add item -> cart -> checkout -> confirmation.
// This sample test demonstrates how a complete feature flow should be written.
// The test stays readable because each page object handles its own UI actions.
test.describe('Checkout flow', () => {
  // This script name ensures all screenshots are saved under the checkout folder.
  const specName = 'checkout.spec.js';
  const scriptFolder = path.join(BasePage.createRunFolder(), 'checkout');

  test('user can complete checkout with valid data', async ({ page, loginPage, productPage, cartPage, checkoutPage }) => {
    // Use a valid user for the happy-path checkout scenario.
    const user = getUser('validUser');

    // Step 1: log in with a valid user.
    await loginPage.goto('/', 'page-open', specName);
    await loginPage.takeStepScreenshot('checkout-login-page', specName);

    // Enter valid login credentials and submit the form.
    await loginPage.login(user.username, user.password, specName);
    await loginPage.takeStepScreenshot('checkout-login-submitted', specName);

    // Step 2: add a product to the cart before checking out.
    await productPage.addFirstProductToCart(specName);
    await productPage.takeStepScreenshot('checkout-product-added', specName);

    // Step 3: open the cart and proceed to checkout.
    await cartPage.openCart(specName);
    await cartPage.takeStepScreenshot('checkout-cart-opened', specName);

    // Verify there is exactly one product in the cart.
    await expect(cartPage.cartItems).toHaveCount(1);
    await cartPage.takeStepScreenshot('checkout-cart-count-verified', specName);

    // Start the checkout process.
    await cartPage.clickCheckout(specName);
    await cartPage.takeStepScreenshot('checkout-started', specName);

    // Step 4: fill form data and finish the order.
    await checkoutPage.fillCustomerInfo('Test', 'User', '12345', specName);
    await checkoutPage.takeStepScreenshot('checkout-form-filled', specName);

    // Finish the purchase and capture the final confirmation stage.
    await checkoutPage.finishCheckout(specName);
    await checkoutPage.takeStepScreenshot('checkout-finished', specName);

    // Confirm the final order success message.
    await checkoutPage.expectOrderConfirmed(specName);
    await page.screenshot({ path: path.join(scriptFolder, 'checkout-confirmation-final.png') });
  });

  test('user sees validation error when checkout information is missing', async ({ loginPage, productPage, cartPage, checkoutPage }) => {
    // Use a valid user so this test focuses only on checkout form validation.
    const user = getUser('validUser');

    // Log in and add a product before opening checkout.
    await loginPage.goto('/', 'page-open', specName);
    await loginPage.login(user.username, user.password, specName);
    await productPage.addFirstProductToCart(specName);
    await cartPage.openCart(specName);
    await cartPage.clickCheckout(specName);

    // Click Continue without entering customer information.
    await checkoutPage.continueButton.click();
    await checkoutPage.takeStepScreenshot('checkout-continue-without-information', specName);

    // Verify that the required first-name validation message is displayed.
    await checkoutPage.expectCheckoutError('Error: First Name is required', specName);
  });

  test('user can remove a product from the cart', async ({ loginPage, productPage, cartPage }) => {
    // Use a valid user for the cart-removal scenario.
    const user = getUser('validUser');

    // Log in, add one product, and open the cart.
    await loginPage.goto('/', 'page-open', specName);
    await loginPage.login(user.username, user.password, specName);
    await productPage.addFirstProductToCart(specName);
    await cartPage.openCart(specName);

    // Confirm the cart starts with one item.
    await cartPage.expectItemCount(1, specName);

    // Remove the item and verify that the cart is empty.
    await cartPage.removeFirstItem(specName);
    await cartPage.expectItemCount(0, specName);
  });
});
