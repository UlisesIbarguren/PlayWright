class ProductPage {
    constructor(page) {
      this.page = page;
      this.productImage = (productId) => page.locator(`#mz-product-grid-image-${productId}`);
      this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
    }
  
    async selectProduct(productId) {
      await this.productImage(productId).click();
    }
  
    async addToCart() {
      await this.addToCartButton.click();
    }
  }
  
  module.exports = ProductPage;
  