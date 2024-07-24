const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const ProductPage = require('../pages/ProductPage');
const CheckoutPage = require('../pages/CheckoutPage');


// Function to generate a unique email address
function generateUniqueEmail(baseEmail) {
  const timestamp = new Date().getTime(); // Get the current timestamp
  return `${baseEmail.split('@')[0]}+${timestamp}@${baseEmail.split('@')[1]}`;
}

test('order placement test', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const checkoutPage = new CheckoutPage(page);

  await page.goto('https://ecommerce-playground.lambdatest.io/');

  // Perform search and product selection
  await homePage.searchForProduct('macbook pro');
  await productPage.selectProduct('62-212469');
  await productPage.addToCart();
  
  // Go to checkout
  await page.getByRole('link', { name: 'Checkout ' }).click();

  // Fill in personal details
  const uniqueEmail = generateUniqueEmail('example@example.com');
  await checkoutPage.fillPersonalDetails('Name', 'Last name', uniqueEmail, '111222333', 'Password');

  // Fill in address details
  await checkoutPage.fillAddressDetails('Address', '', 'City', '66666', '223', '3624');

  // Agree to terms and continue
  await checkoutPage.agreeToTermsAndConditions();
  await checkoutPage.continueToPayment();
  await checkoutPage.confirmOrder();

  // Verify order confirmation
  await checkoutPage.verifyOrderConfirmation();
});
