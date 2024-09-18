import { test, expect } from '@playwright/test';
import { HomePage } from '../pageObjects/HomePage';
import { ContactUsPage } from '../pageObjects/ContactUsPage';

let homePage: HomePage;
let contactUsPage: ContactUsPage;

test.beforeEach(async ({ page, context }) => {
  // Load storage state from file (if exists)
  try {
    await context.storageState({ path: 'state.json' });
  } catch (e) {
    console.warn('No existing storage state found. Proceeding with a fresh session.');
  }

  homePage = new HomePage(page);
  contactUsPage = new ContactUsPage(page);

  await page.goto('/');

});

test.describe('Contact Us', () => {

    test('Contact Us', async () => {
        await homePage.navigateToContactUs()
        await contactUsPage.sendContactUsMessage()
    });
});