import { Page, Locator, expect } from '@playwright/test';

export class ContactUsPage {
  readonly page: Page;
  readonly contactUsLink: Locator;
  readonly subjectHeadingField: Locator;
  readonly emailAddressField: Locator;
  readonly orderReference: Locator;
  readonly messageBody: Locator;
  readonly sendButton: Locator;
  readonly contactUsMessageConfirmation: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.contactUsLink = page.getByText('Contact us');
    this.subjectHeadingField = page.locator('#id_contact')
    this.emailAddressField = page.locator('#email')
    this.orderReference = page.locator('#id_order')
    this.messageBody = page.locator('#message')
    this.sendButton = page.locator('#submitMessage')
    this.contactUsMessageConfirmation = page.getByText('Your message has been successfully sent to our team.')
  }


  async navigateToContactUs() {
    await this.contactUsLink.click();
  }

  async sendContactUsMessage() {
    await this.subjectHeadingField.selectOption('Customer service')
    await this.emailAddressField.fill('example@example.com')
    await this.orderReference.fill('random')
    await this.messageBody.fill('This is a test message')
    await this.sendButton.click()
    await expect(this.contactUsMessageConfirmation).toBeVisible();
  }
}
