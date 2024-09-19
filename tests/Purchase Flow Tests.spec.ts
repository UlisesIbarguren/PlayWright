import { test } from '@playwright/test';
import { HomePage } from '../pageObjects/HomePage';
import { AccountCreationPage } from '../pageObjects/AccountPage';
import { AddressPage } from '../pageObjects/AddressPage';
import { CheckoutPage } from '../pageObjects/CheckoutPage';

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
    // Load storage state from file (if exists)
    await context.storageState({ path: 'state.json' });

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
    await context.storageState({ path: 'state.json' });

    await addressPage.fillAddressDetails();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.acceptTerms();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.selectPaymentMethod();
    await checkoutPage.confirmOrder();
    await checkoutPage.verifyOrderComplete();
  }

  test.skip('purchaseWhiteBlouse', async ({ context }) => {
    await homePage.navigateToWomen();
    await homePage.selectBlouse();
    await homePage.selectWhite();
    await completePurchaseFlow(context); // Pass context to the function
  });

  test.skip('purchasePinkDress', async ({ context }) => {
    await homePage.navigateToDresses();
    await homePage.selectPrintedDress();
    await homePage.selectPink();
    await completePurchaseFlow(context); // Pass context to the function
  });

  test.skip('purchaseBlueDress', async ({ context }) => {
    await homePage.navigateToDresses();
    await homePage.selectPrintedSummerDress1();
    await homePage.selectBlue();
    await completePurchaseFlow(context); // Pass context to the function
  });

  test.skip('purchaseBlackDress', async ({ context }) => {
    await homePage.navigateToDresses();
    await homePage.selectPrintedSummerDress1();
    await homePage.selectBlack();
    await completePurchaseFlow(context); // Pass context to the function
  });

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
    await context.clearCookies();
  });
});
