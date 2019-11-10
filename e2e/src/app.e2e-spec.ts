import { browser, ExpectedConditions, logging } from 'protractor';

import { AppProductList } from './product-list.po';
import { AppProductDetails } from './product-details.po';
import { AppCart } from './cart.po';
import { products } from '../../src/app/products';

describe('workspace-project App', () => {
  let productListPage: AppProductList;
  let productDetailsPage: AppProductDetails;
  let productCartPage: AppCart;

  beforeEach(() => {
    productListPage = new AppProductList();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  describe('top-bar', () => {
    it('should display app title', () => {
      productListPage.navigateTo();
      expect(productListPage.getAppTitleText()).toEqual('My Store');
    });

    it(`app-title should link to '/'`, () => {
      expect(productListPage.getAppTitleLink()).toEqual(browser.baseUrl);
    });

    it(`checkout button should link to '/cart'`, () => {
      expect(productListPage.getCheckoutButtonLink()).toEqual(browser.baseUrl + 'cart');
    });

    it('clicking checkout should navigate to shopping cart', () => {
      productListPage.clickCheckoutButton();
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'cart');
    });

    it('clicking app-title should navigate to home', () => {
      productListPage.clickAppTitle();
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl);
    });
  });

  describe('product-list', () => {
    beforeAll(() => {
      productListPage.navigateTo();
    });

    it(`should have page title 'Products'`, () => {
      expect(productListPage.getPageTitle()).toEqual('Products');
    });

    it('should show products name', () => {
      products.forEach((product, index) => {
        expect(productListPage.getProductName(index)).toEqual(product.name);
      });
    });

    it('each product name a hover note to product details', () => {
      products.forEach((product, index) => {
        expect(productListPage.getProductLinkHoverText(index)).toEqual(product.name + ' details');
      });
    });

    it('should show description', () => {
      products.forEach((product, index) => {
        if (product.description) {
          expect(productListPage.getProductDescription(index)).toEqual('Description: ' + product.description);
        } else {
          expect(productListPage.hasProductDescription(index)).toBe(false);
        }
      });
    });

    it('clicking share should open alert', () => {
      products.forEach((product, index) => {
        productListPage.clickShareButton(index);
        browser.wait(ExpectedConditions.alertIsPresent(), 5000, 'Alert not present');
        const alert = browser.switchTo().alert();
        expect(alert.getText()).toEqual(`Product ${product.name} has been shared!`);
        alert.accept();
      });
    });

    it('price > 700 should have notification', () => {
      products.forEach((product, index) => {
        if (product.price > 700) {
          productListPage.clickNotifyMeButton(index);
          browser.wait(ExpectedConditions.alertIsPresent(), 5000, 'Alert not present');
          const alert = browser.switchTo().alert();
          expect(alert.getText()).toEqual('You will be notified when the product goes on sale');
          alert.accept();
        } else {
          expect(productListPage.hasNotifyMeButton(index)).toBe(false);
        }
      });
    });

    it('product name should have product details link', () => {
      products.forEach((product, index) => {
        expect(productListPage.getProductNameLinText(index)).toEqual(`${browser.baseUrl}products/${index}`);
      });
    });
  });

  describe('product-details', () => {
    beforeAll(() => {
      productDetailsPage = new AppProductDetails();
      productListPage.navigateTo();
    });

    it('should have product details', () => {
      products.forEach((product, index) => {
        productListPage.clickProductName(index);
        const url = browser.baseUrl + `products/${index}`;
        browser.wait(ExpectedConditions.urlContains(url), 5000);
        expect(productDetailsPage.getPageTitle()).toEqual('Product Details');
        expect(productDetailsPage.getProductName()).toEqual(product.name);
        expect(productDetailsPage.getProductPrice()).toEqual(`$${product.price}.00`);
        expect(productDetailsPage.getProductDescription()).toEqual(product.description);
        productListPage.navigateTo();
        browser.wait(ExpectedConditions.urlContains(browser.baseUrl ), 5000);
      });
    });

    it('should have a buy button', () => {
      products.forEach((product, index) => {
        productDetailsPage.navigateTo(index);
        const url = browser.baseUrl + `products/${index}`;
        browser.wait(ExpectedConditions.urlContains(url), 5000);
        productDetailsPage.clickBuyButton();
        browser.wait(ExpectedConditions.alertIsPresent(), 5000, 'Alert not present');
        const alert = browser.switchTo().alert();
        expect(alert.getText()).toEqual('Your product has been added to the cart!');
        alert.accept();
      });
    });
  });
});
