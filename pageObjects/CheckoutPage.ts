import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly proceedToCheckoutButton: Locator;
  readonly cgvCheckbox: Locator;
  readonly paymentMethodLink: Locator;
  readonly confirmOrderButton: Locator;
  readonly orderConfirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.proceedToCheckoutButton = page.getByRole('button', { name: 'Proceed to checkout ' });
    this.cgvCheckbox = page.locator('#cgv');
    this.paymentMethodLink = page.getByRole('link', { name: 'Pay by bank wire (order' });
    this.confirmOrderButton = page.getByRole('button', { name: 'I confirm my order' });
    this.orderConfirmationMessage = page.getByText('Your order on My Shop is complete.');
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async acceptTerms() {
    await this.cgvCheckbox.check();
  }

  async selectPaymentMethod() {
    await this.paymentMethodLink.click();
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }

  async verifyOrderComplete() {
    await expect(this.orderConfirmationMessage).toBeVisible();
  }
}
