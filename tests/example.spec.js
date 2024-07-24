const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const CheckoutPage = require('../pages/CheckoutPage');
const ConfirmationPage = require('../pages/ConfirmationPage');

// Function to generate a unique email address
function generateUniqueEmail(baseEmail) {
  const timestamp = new Date().getTime(); // Get the current timestamp
  return `${baseEmail.split('@')[0]}+${timestamp}@${baseEmail.split('@')[1]}`;
}

test('order placement test', async ({ page }) => {
  const homePage = new HomePage(page);
  const checkoutPage = new CheckoutPage(page);
  const confirmationPage = new ConfirmationPage(page);

  // Navigate to the home page
  await page.goto('https://ecommerce-playground.lambdatest.io/');

  // Perform search and product selection
  await homePage.searchForProduct('macbook pro');
  await homePage.selectProduct('62-212469');
  await page.locator('text="Add to Cart"').click();
  await homePage.checkoutLink.click();

  // Use the function to generate a unique email
  const uniqueEmail = generateUniqueEmail('example@example.com');

  // Fill out the checkout form
  await checkoutPage.fillCheckoutForm({
    firstName: 'Name',
    lastName: 'Last name',
    email: uniqueEmail,
    telephone: '111222333',
    password: 'Password',
    address1: 'Address',
    city: 'City',
    postCode: '66666',
    country: '223',
    zone: '3624'
  });

  // Confirm the order
  await checkoutPage.confirmOrder();

  // Verify order confirmation
  await confirmationPage.verifyOrderConfirmation();
});
