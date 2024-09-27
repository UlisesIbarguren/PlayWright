import { test, expect } from '@playwright/test';
import { FooterPage } from '../pageObjects/HomePageFooter';

// Grouping tests for the footer section
test.describe('Footer Section Tests', () => {
    let footerPage: FooterPage; // Declare the footerPage variable

    // Set up code that runs before each test
    test.beforeEach(async ({ page }) => {
        // Navigate to the base URL before each test
        await page.goto('/');

        // Initialize the FooterPage with the current page instance
        footerPage = new FooterPage(page);
    });

    // Test for Categories heading
    test('Verify Categories heading', async () => {
        await footerPage.verifyText(footerPage.categoriesHeading, 'Categories');
    });

    // Test for Women heading
    test('Verify Women heading', async () => {
        await footerPage.verifyText(footerPage.womenHeading, 'Women');
    });

    // Test for Information heading
    test('Verify Information heading', async () => {
        await footerPage.verifyText(footerPage.informationHeading, 'Information');
    });

    // Test for Stores title
    test('Verify Stores title', async () => {
        await footerPage.verifyText(footerPage.storesTitle, 'Our stores');
    });

    // Test for Terms and Conditions title
    test('Verify Terms and Conditions title', async () => {
        await footerPage.verifyText(footerPage.termsAndConditionsTitle, 'Terms and conditions of use');
    });

    // Test for About Us text
    test('Verify About Us text', async () => {
        await footerPage.verifyText(footerPage.aboutUsText, 'About us');
    });

    // Test for My Account heading
    test('Verify My Account heading', async () => {
        await footerPage.verifyText(footerPage.myAccountHeading, 'My account');
    });

    // Test for My Orders title
    test('Verify My Orders title', async () => {
        await footerPage.verifyText(footerPage.ordersTitle, 'My orders');
    });

    // Test for My Credit Slips title
    test('Verify My Credit Slips title', async () => {
        await footerPage.verifyText(footerPage.creditSlipsTitle, 'My credit slips');
    });

    // Test for My Addresses title
    test('Verify My Addresses title', async () => {
        await footerPage.verifyText(footerPage.addressesTitle, 'My addresses');
    });

    // Test for My Personal Info title
    test('Verify My Personal Info title', async () => {
        await footerPage.verifyText(footerPage.personalInfoTitle, 'My personal info');
    });

    // Test for Store Information heading
    test('Verify Store Information heading', async () => {
        await footerPage.verifyText(footerPage.storeInformationHeading, 'Store Information');
    });

    // Test for Address text
    test('Verify Address text', async () => {
        await footerPage.verifyText(footerPage.addressText, 'My Company, 42 avenue des Champs Elysées 75000 Paris France');
    });

    // Test for Call Us Now text
    test('Verify Call Us Now text', async () => {
        await footerPage.verifyContainsText(footerPage.callUsNowText, 'Call us now');
    });

    // Test for Email text
    test('Verify Email text', async () => {
        await footerPage.verifyContainsText(footerPage.emailText, 'Email');
    });

     // Navigate to Women
     test('Navigate to Women', async () => {
        await footerPage.womenHeading.click();
        const womenTitle = await footerPage.womenTitle.textContent();
        expect(womenTitle).toBe('Women - My Shop');
    });

    // Navigate to Our stores
    test('Navigate to Our stores', async () => {
        await footerPage.storesTitle.click();
        const storeTitle = await footerPage.storeTitle.textContent();
        expect(storeTitle).toBe('Stores - My Shop');
    });
});
