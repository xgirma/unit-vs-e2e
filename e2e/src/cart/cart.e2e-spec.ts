import { browser, ExpectedConditions } from 'protractor';

import { AppCart } from './cart.po';
import { AppProductList } from '../product-list/product-list.po';
import { AppProductDetails } from '../product-details/product.details.po';
import { AppTopBar } from '../top-bar/top-bar.po';
import { products } from '../../../src/app/products';

describe('Cart', () => {
  let page: AppCart;
  let appTopBar: AppTopBar;
  let productListPage: AppProductList;
  let productDetailsPage: AppProductDetails;

  beforeAll(() => {
    appTopBar = new AppTopBar();
    productListPage = new AppProductList();
    productDetailsPage = new AppProductDetails();
    page = new AppCart();
    productListPage.navigateTo();
  });

  it('buy products', () => {
    products.forEach((product, index) => {
      // products list page
      productListPage.clickName(index);
      const url = browser.baseUrl + `products/${index}`;
      browser.wait(ExpectedConditions.urlContains(url), 5000);
      // product details page
      productDetailsPage.clickBuyButton();
      browser.wait(ExpectedConditions.alertIsPresent(), 5000, 'Alert not present');
      const alert = browser.switchTo().alert();
      expect(alert.getText()).toEqual('Your product has been added to the cart!');
      alert.accept();
      // products list page
      appTopBar.clickTitle();
    });
  });

  it('should have products in cart', () => {
    appTopBar.clickCheckout();
    const url = browser.baseUrl + 'cart';
    browser.wait(ExpectedConditions.urlContains(url), 5000);
    products.forEach((product, index) => {
      expect(page.getName(index)).toEqual(product.name);
      expect(page.getPrice(index)).toEqual(`$${product.price}.00`);
    });
  });
});
