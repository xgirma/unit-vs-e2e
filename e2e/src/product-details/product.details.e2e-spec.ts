import {browser, ExpectedConditions} from 'protractor';

import {AppProductDetails} from './product.details.po';
import {AppProductList} from '../product-list/product-list.po';
import {products} from '../../../src/app/products';

describe('product details', () => {
  let productListPage: AppProductList;
  let page: AppProductDetails;

  beforeEach(() => {
    productListPage = new AppProductList();
    page = new AppProductDetails();
    productListPage.navigateTo();
  });

  it('should have product details', () => {
    products.forEach((product, index) => {
      productListPage.clickName(index);
      const url = browser.baseUrl + `products/${index}`;
      browser.wait(ExpectedConditions.urlContains(url), 5000);
      expect(page.getPageTitle()).toEqual('Product Details');
      expect(page.getProductName()).toEqual(product.name);
      expect(page.getProductPrice()).toEqual(`$${product.price}.00`);
      expect(page.getProductDescription()).toEqual(product.description);
      productListPage.navigateTo();
      browser.wait(ExpectedConditions.urlContains(browser.baseUrl), 5000);
    });
  });

  it('should have a buy button', () => {
    products.forEach((product, index) => {
      page.navigateTo(index); // warning clears cart
      const url = browser.baseUrl + `products/${index}`;
      browser.wait(ExpectedConditions.urlContains(url), 5000);
      page.clickBuyButton();
      browser.wait(ExpectedConditions.alertIsPresent(), 5000, 'Alert not present');
      const alert = browser.switchTo().alert();
      expect(alert.getText()).toEqual('Your product has been added to the cart!');
      alert.accept();
    });
  });
});
