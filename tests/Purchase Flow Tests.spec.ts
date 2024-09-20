import { test } from '@playwright/test';
import { HomePage } from '../pageObjects/HomePage';
import { AccountCreationPage } from '../pageObjects/AccountPage';
import { AddressPage } from '../pageObjects/AddressPage';
import { CheckoutPage } from '../pageObjects/CheckoutPage';
import * as fs from 'fs';

function generateUniqueEmail(baseEmail: string): string {
  const timestamp = Date.now();
  const [user, domain] = baseEmail.split('@');
  return `${user}+${timestamp}@${domain}`;
}

test.describe('Purchase Flow Tests', () => {
  let homePage: HomePage;
  let accountPage: AccountCreationPage;
  let addressPage: AddressPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page, context }) => {
    // Check if the state.json file exists before loading
    if (fs.existsSync('state.json')) {
      console.log('Loading existing session state from state.json');
      await context.storageState({ path: 'state.json' });
    } else {
      console.log('No session state found, starting fresh.');
    }

    // Instantiate new page objects for each test
    homePage = new HomePage(page);
    accountPage = new AccountCreationPage(page);
    addressPage = new AddressPage(page);
    checkoutPage = new CheckoutPage(page);

    await page.goto('/');
  });

  async function completePurchaseFlow(context: any) {
    const uniqueEmail = generateUniqueEmail('example@example.com');

    await homePage.addToCart();
    await homePage.proceedToCheckout();

    await accountPage.createAccount(uniqueEmail);
    await accountPage.completeRegistration();

    // Save the storage state after completing registration
    console.log('Saving session state after registration.');
    await context.storageState({ path: 'state.json' });

    await addressPage.fillAddressDetails();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.acceptTerms();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.selectPaymentMethod();
    await checkoutPage.confirmOrder();
    await checkoutPage.verifyOrderComplete();

    // Save state again after purchase completion
    console.log('Saving session state after purchase.');
    await context.storageState({ path: 'state.json' });
  }

  test('purchaseWhiteDress', async ({ context }) => {
    await homePage.navigateToDresses();
    await homePage.selectPrintedSummerDress2();
    await homePage.selectWhite();
    await completePurchaseFlow(context); // Pass context to the function
  });

  test('checkOutOfStockTshirt', async () => {
    await homePage.navigateToTshirts();
    await homePage.selectTshirt();
    await homePage.verifyoutOfStockMessage();
  });

  test('navigateToBlog', async ({ context }) => {
    await homePage.navigateToBlog(context);
  });

  test.afterEach(async ({ context }) => {
    // Save session state after each test
    console.log('Saving session state after test.');
    await context.storageState({ path: 'state.json' });
    
    // Clear cookies
    await context.clearCookies();
  });
});
