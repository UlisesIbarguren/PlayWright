import { Page, Locator, expect } from '@playwright/test';

export class FooterPage {
  readonly page: Page;

  // Define locators with explicit types
  readonly categoriesHeading: Locator;
  readonly womenHeading: Locator;
  readonly informationHeading: Locator;
  readonly storesTitle: Locator;
  readonly termsAndConditionsTitle: Locator;
  readonly aboutUsText: Locator;
  readonly myAccountHeading: Locator;
  readonly ordersTitle: Locator;
  readonly creditSlipsTitle: Locator;
  readonly addressesTitle: Locator;
  readonly personalInfoTitle: Locator;
  readonly storeInformationHeading: Locator;
  readonly addressText: Locator;
  readonly callUsNowText: Locator;
  readonly emailText: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.categoriesHeading = this.page.getByRole('heading', { name: 'Categories' });
    this.womenHeading = this.page.getByTitle('You will find here all woman');
    this.informationHeading = this.page.getByRole('heading', { name: 'Information' }).first();
    this.storesTitle = this.page.getByTitle('Our stores');
    this.termsAndConditionsTitle = this.page.getByTitle('Terms and conditions of use');
    this.aboutUsText = this.page.getByText('About us');
    this.myAccountHeading = this.page.getByRole('heading', { name: 'My Account' });
    this.ordersTitle = this.page.getByTitle('My orders');
    this.creditSlipsTitle = this.page.getByTitle('My credit slips');
    this.addressesTitle = this.page.getByTitle('My addresses');
    this.personalInfoTitle = this.page.getByTitle('My personal info');
    this.storeInformationHeading = this.page.getByRole('heading', { name: 'Store Information' });
    this.addressText = this.page.getByText('My Company, 42 avenue des Champs Elysées 75000 Paris France');
    this.callUsNowText = this.page.locator('#block_contact_infos').getByText('Call us now');
    this.emailText = this.page.getByText('Email: sales@yourcompany.com');
  }

  // Method to verify headings and texts
  async verifyText(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toHaveText(expectedText);
  }

  async verifyContainsText(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toContainText(expectedText);
  }
}
