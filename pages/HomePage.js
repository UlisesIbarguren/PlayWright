class HomePage {
    constructor(page) {
      this.page = page;
      this.searchBox = page.getByRole('textbox', { name: 'Search For Products' });
    }
  
    async searchForProduct(productName) {
      await this.searchBox.click();
      await this.searchBox.fill(productName);
      await this.searchBox.press('Enter');
    }
  }
  
  module.exports = HomePage;
  