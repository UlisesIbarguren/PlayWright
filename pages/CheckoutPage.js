const { expect } = require('@playwright/test');

class CheckoutPage {
    constructor(page) {
      this.page = page;
      this.firstNameField = page.getByRole('textbox', { name: 'First Name*' });
      this.lastNameField = page.getByRole('textbox', { name: 'Last Name*' });
      this.emailField = page.getByRole('textbox', { name: 'E-Mail*' });
      this.telephoneField = page.getByPlaceholder('Telephone');
      this.passwordField = page.getByRole('textbox', { name: 'Password*' });
      this.passwordConfirmField = page.getByPlaceholder('Password Confirm');
      this.companyField = page.getByRole('textbox', { name: 'Company' });
      this.address1Field = page.getByRole('textbox', { name: 'Address 1*' });
      this.address2Field = page.getByRole('textbox', { name: 'Address 2' });
      this.cityField = page.getByRole('textbox', { name: 'City*' });
      this.postCodeField = page.getByRole('textbox', { name: 'Post Code*' });
      this.countrySelect = page.locator('#input-payment-country');
      this.zoneSelect = page.locator('#input-payment-zone');
      this.privacyPolicyCheckbox = page.getByText('I have read and agree to the Privacy Policy');
      this.termsAndConditionsCheckbox = page.getByText('I have read and agree to the Terms & Conditions');
      this.continueButton = page.getByRole('button', { name: 'Continue ' });
      this.confirmOrderButton = page.getByRole('button', { name: 'Confirm Order ' });
      this.orderConfirmationMessage = page.getByRole('heading', { name: ' Your order has been placed!' });
    }
  
    async fillPersonalDetails(firstName, lastName, email, telephone, password) {
      await this.firstNameField.fill(firstName);
      await this.firstNameField.press('Tab');
      await this.lastNameField.fill(lastName);
      await this.lastNameField.press('Tab');
      await this.emailField.fill(email);
      await this.emailField.press('Tab');
      await this.telephoneField.fill(telephone);
      await this.telephoneField.press('Tab');
      await this.passwordField.fill(password);
      await this.passwordField.press('Tab');
      await this.passwordConfirmField.fill(password);
      await this.passwordConfirmField.press('Tab');
    }
  
    async fillAddressDetails(address1, address2, city, postCode, country, zone) {
      await this.address1Field.fill(address1);
      await this.address1Field.press('Tab');
      await this.address2Field.press('Tab');
      await this.cityField.fill(city);
      await this.cityField.press('Tab');
      await this.postCodeField.fill(postCode);
      await this.countrySelect.selectOption(country);
      await this.zoneSelect.selectOption(zone);
    }
  
    async agreeToTermsAndConditions() {
      await this.privacyPolicyCheckbox.click();
      await this.termsAndConditionsCheckbox.click();
    }
  
    async continueToPayment() {
      await this.continueButton.click();
    }
  
    async confirmOrder() {
      await this.confirmOrderButton.click();
    }
  
    async verifyOrderConfirmation() {
      await expect(this.orderConfirmationMessage).toBeVisible();
    }
  }
  
  module.exports = CheckoutPage;
  