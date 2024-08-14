import { Page, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class AccountCreationPage {
  readonly page: Page;
  readonly emailCreateInput: Locator;
  readonly createAccountButton: Locator;
  readonly mrRadio: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly passwordInput: Locator;
  readonly daysDropdown: Locator;
  readonly monthsDropdown: Locator;
  readonly yearsDropdown: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailCreateInput = page.locator('#email_create');
    this.createAccountButton = page.getByRole('button', { name: ' Create an account' });
    this.mrRadio = page.getByLabel('Mr.');
    this.firstNameInput = page.getByLabel('First name *');
    this.lastNameInput = page.getByLabel('Last name *');
    this.passwordInput = page.getByLabel('Password *');
    this.daysDropdown = page.locator('#days');
    this.monthsDropdown = page.locator('#months');
    this.yearsDropdown = page.locator('#years');
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  async createAccount(uniqueEmail: string) {
    await this.emailCreateInput.click();
    await this.emailCreateInput.fill(uniqueEmail);
    await this.createAccountButton.click();
  }

  async completeRegistration() {
    await this.mrRadio.check();
    await this.firstNameInput.fill(faker.person.firstName());
    await this.lastNameInput.fill(faker.person.lastName());
    await this.passwordInput.fill(faker.internet.password());
    await this.daysDropdown.selectOption(faker.date.birthdate({ min: 1, max: 28 }).getDate().toString());
    const monthName = faker.date.month(); 
    const monthNumber = new Date(`${monthName} 1, 2000`).getMonth() + 1; 
    await this.monthsDropdown.selectOption(monthNumber.toString());
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 21;
    await this.yearsDropdown.selectOption(faker.date.birthdate().getFullYear().toString());
    await this.registerButton.click();
  }
}
