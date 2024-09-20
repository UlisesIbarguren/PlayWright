import { Page } from '@playwright/test';

export class MainMenuPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Existing Locators
  get womenMenuLink() {
    return this.page.locator('#block_top_menu').getByRole('link', { name: 'Women' });
  }

  get tshirtsLink() {
    return this.page.getByRole('link', { name: ' T-shirts' });
  }

  get topsLink() {
    return this.page.getByRole('link', { name: 'Tops', exact: true });
  }

  get blousesLink() {
    return this.page.getByRole('link', { name: ' Blouses' });
  }

  get dressesLink() {
    return this.page.getByRole('link', { name: 'Dresses', exact: true }).first();
  }

  get casualDressesLink() {
    return this.page.locator('#block_top_menu').getByRole('link', { name: 'Casual Dresses' });
  }

  get eveningDressesLink() {
    return this.page.getByRole('link', { name: 'Evening Dresses' });
  }

  get summerDressesLink() {
    return this.page.getByRole('link', { name: 'Summer Dresses' });
  }

  get tshirtsMainLink() {
    return this.page.getByRole('link', { name: 'T-shirts' });
  }

  get blogLink() {
    return this.page.getByRole('link', { name: 'Blog' });
  }

  // Methods
  async hoverOverWomenMenu() {
    await this.womenMenuLink.hover();
  }
}
