import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly womenLink: Locator;
  readonly dresses: Locator;
  readonly tShirts: Locator;
  readonly tShirt: Locator;
  readonly blouseLink: Locator;
  readonly printedDress : Locator;
  readonly printedSummerDress1 : Locator;
  readonly printedSummerDress2 : Locator;
  readonly whiteLink: Locator;
  readonly pinkLink: Locator;
  readonly blueLink: Locator;
  readonly blackLink: Locator;
  readonly addToCartButton: Locator;
  readonly proceedToCheckoutLink: Locator;
  readonly outOfStockMessage: Locator;
  readonly blogLink: Locator;
  readonly contactUsLink: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.womenLink = page.locator('#block_top_menu').getByRole('link', { name: 'Women' });
    this.dresses = page.locator('#block_top_menu').getByRole('link', { name: 'Dresses' });
    this.tShirts = page.locator('#block_top_menu').getByRole('link', { name: 'T-shirts' });
    this.tShirt = page.getByText('Faded Short Sleeve T-shirts');
    this.blouseLink = page.getByText('Blouse', { exact: true });
    this.printedDress = page.getByRole('link', { name: 'Printed Dress' }).nth(3);
    this.printedSummerDress1 = page.getByText('Printed Summer Dress').nth(1);
    this.printedSummerDress2 = page.getByText('Printed Summer Dress').nth(2);
    this.whiteLink = page.getByRole('link', { name: 'White' });
    this.pinkLink = page.getByRole('link', { name: 'Pink' });
    this.blueLink = page.getByRole('link', { name: 'Blue' });
    this.blackLink = page.getByRole('link', { name: 'Black' });
    this.addToCartButton = page.getByRole('button', { name: ' Add to cart' });
    this.proceedToCheckoutLink = page.getByRole('link', { name: 'Proceed to checkout ' });
    this.outOfStockMessage = page.getByText('This product is no longer in stock');
    this.blogLink = page.getByText('Blog');
    this.contactUsLink = page.getByText('Contact us');

  }

  async navigateToWomen() {
    await this.womenLink.waitFor({ state: 'visible' });
    await this.womenLink.click();
  }

  async navigateToDresses() {
    await this.dresses.waitFor({ state: 'visible' });
    await this.dresses.click();
  }

  async navigateToTshirts() {
    await this.tShirts.waitFor({ state: 'visible' });
    await this.tShirts.click();
  }

  async selectBlouse() {
    await this.blouseLink.waitFor({ state: 'visible' });
    await this.blouseLink.click();
  }

  async selectTshirt() {
    await this.tShirt.waitFor({ state: 'visible' });
    await this.tShirt.click();
  }

  async selectPrintedDress() {
    await this.printedDress.waitFor({ state: 'visible' });
    await this.printedDress.click();
  }

  async selectPrintedSummerDress1() {
    await this.printedSummerDress1.waitFor({ state: 'visible' });
    await this.printedSummerDress1.click();
  }

  async selectPrintedSummerDress2() {
    await this.printedSummerDress2.scrollIntoViewIfNeeded()
    await this.printedSummerDress2.waitFor({ state: 'visible' });
    await this.printedSummerDress2.click();
  }

  async selectWhite() {
    await this.whiteLink.waitFor({ state: 'visible' }); 
    await this.whiteLink.click();
  }

  async selectPink() {
    await this.pinkLink.waitFor({ state: 'visible' });
    await this.pinkLink.click();
  }

  async selectBlue() {
    await this.blueLink.waitFor({ state: 'visible' });
    await this.blueLink.click();
  }

  async selectBlack() {
    await this.blackLink.waitFor({ state: 'visible' });
    await this.blackLink.click();
  }

  async addToCart() {
    await this.addToCartButton.waitFor({ state: 'visible' });
    await this.addToCartButton.click();
  }

  async verifyoutOfStockMessage() {
    await expect(this.outOfStockMessage).toBeVisible();
  }

  async navigateToBlog(context: any) {
    // Listen for the new tab (new page)
    const [newPage] = await Promise.all([
      context.waitForEvent('page'), // Wait for the new tab to open
      this.blogLink.click() // Click the blog link
    ]);

    // Wait for the new page to load
    await newPage.waitForLoadState();

    // Assert that the new page has the expected URL
    expect(newPage.url()).toBe('https://prestashop.com/blog/');

    // Assert that the new page contains expected content
    await expect(newPage).toHaveTitle('Ecommerce advice and success stories – Blog | PrestaShop');
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutLink.click();
    await this.proceedToCheckoutLink.click();
  }

  async navigateToContactUs() {
    await this.contactUsLink.click();
  }
}
