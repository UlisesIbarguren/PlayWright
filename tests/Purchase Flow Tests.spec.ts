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

let homePage: HomePage;
let accountPage: AccountCreationPage;
let addressPage: AddressPage;
let checkoutPage: CheckoutPage;

test.beforeEach(async ({ page, context }) => {
  // Load storage state from file (if exists)
  try {
    await context.storageState({ path: 'state.json' });
  } catch (e) {
    console.warn('No existing storage state found. Proceeding with a fresh session.');
  }

  homePage = new HomePage(page);
  accountPage = new AccountCreationPage(page);
  addressPage = new AddressPage(page);
  checkoutPage = new CheckoutPage(page);

  await page.goto('/');

});

async function completePurchaseFlow() {
  const uniqueEmail = generateUniqueEmail('example@example.com');
  
  await homePage.addToCart();
  await homePage.proceedToCheckout();

  await accountPage.createAccount(uniqueEmail);
  await accountPage.completeRegistration();

  await addressPage.fillAddressDetails();

  await checkoutPage.proceedToCheckout();
  await checkoutPage.acceptTerms();
  await checkoutPage.proceedToCheckout();
  await checkoutPage.selectPaymentMethod();
  await checkoutPage.confirmOrder();

  await checkoutPage.verifyOrderComplete();
}

test.describe('Purchase Flow Tests', () => {

  test.skip('purchaseWhiteBlouse', async () => {
    await homePage.navigateToWomen();
    await homePage.selectBlouse();
    await homePage.selectWhite();
    await completePurchaseFlow(); // Use the helper function
  });

  test.skip('purchasePinkDress', async () => {
    await homePage.navigateToDresses();
    await homePage.selectPrintedDress();
    await homePage.selectPink();
    await completePurchaseFlow(); // Use the helper function
  });


  test.skip('purchaseBlueDress', async () => {
    await homePage.navigateToDresses();
    await homePage.selectPrintedSummerDress1();
    await homePage.selectBlue();
    await completePurchaseFlow(); // Use the helper function
  });

  test.skip('purchaseBlackDress', async () => {
    await homePage.navigateToDresses();
    await homePage.selectPrintedSummerDress1();
    await homePage.selectBlack();
    await completePurchaseFlow(); // Use the helper function
  });

  test('purchaseWhiteDress', async () => {
    await homePage.navigateToDresses();
    await homePage.selectPrintedSummerDress2();
    await homePage.selectWhite();
    await completePurchaseFlow(); // Use the helper function
  });

  test('checkOutOfStockTshirt', async () => {
    await homePage.navigateToTshirts();
    await homePage.selectTshirt();
    await homePage.verifyoutOfStockMessage();
  });

  test('navigateToBlog', async ({ context }) => {
    await homePage.navigateToBlog(context);
  });  
  
});
