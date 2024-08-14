import { Page, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class AddressPage {
  private page: Page;
  private addressInput: Locator;
  private cityInput: Locator;
  private stateDropdown: Locator;
  private zipCodeInput: Locator;
  private homePhoneInput: Locator;
  private mobilePhoneInput: Locator;
  private saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addressInput = page.locator('#address1');
    this.cityInput = page.locator('#city');
    this.stateDropdown = page.locator('#id_state');
    this.zipCodeInput = page.locator('#postcode');
    this.homePhoneInput = page.locator('#phone');
    this.mobilePhoneInput = page.locator('#phone_mobile');
    this.saveButton = page.locator('#submitAddress');
  }

  async fillAddressDetails() {
    await this.addressInput.fill(faker.location.streetAddress());
    await this.cityInput.fill(faker.location.city());
    await this.stateDropdown.selectOption(faker.location.state());
    await this.zipCodeInput.fill(faker.location.zipCode('#####'));
    await this.homePhoneInput.fill(faker.string.numeric('##########'));
    await this.mobilePhoneInput.fill(faker.string.numeric('##########'));
    await this.saveButton.click();
  }
}
