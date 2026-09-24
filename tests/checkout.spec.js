import { test, expect } from '../utils/fixtures.js';
import { getUser } from '../utils/testData.js';

// This sample test demonstrates how a complete feature flow should be written.
// The test stays readable because each page object handles its own UI actions.
test.describe('Checkout flow', () => {
  test('user can complete checkout with valid data', async ({ loginPage, productPage, cartPage, checkoutPage }) => {
    const user = getUser('validUser');

    // Step 1: log in with a valid user.
    await loginPage.goto();
    await loginPage.login(user.username, user.password);

    // Step 2: add a product to the cart before checking out.
    await productPage.addFirstProductToCart();

    // Step 3: open the cart and proceed to checkout.
    await cartPage.openCart();
    await expect(cartPage.cartItems).toHaveCount(1);
    await cartPage.clickCheckout();

    // Step 4: fill form data and finish the order.
    await checkoutPage.fillCustomerInfo('Test', 'User', '12345');
    await checkoutPage.finishCheckout();
    await checkoutPage.expectOrderConfirmed();
  });
});
