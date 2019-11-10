import { browser, logging } from 'protractor';

import { AppPage } from './app.po';
import { products } from '../../src/app/products';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  describe('top-bar', () => {
    it('should display title', () => {
      page.navigateTo();
      expect(page.getTitleText()).toEqual('My Store');
    });

    it(`title should link to '/'`, () => {
      expect(page.getTitleLink()).toEqual(browser.baseUrl);
    });

    it(`checkout button should link to '/cart'`, () => {
      expect(page.getCheckoutButtonLink()).toEqual(browser.baseUrl + 'cart');
    });

    it('clicking checkout should navigate to shopping cart', () => {
      page.clickCheckoutButton();
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'cart');
    });

    it('clicking title should navigate to home', () => {
      page.clickTitle();
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl);
    });
  });

  describe('product-list', () => {
    beforeAll(() => {
      page.navigateTo();
    });

    it(`should have sub-title 'product'`, () => {
      expect(page.getProductTitle()).toEqual('Products');
    });

    it('should show products name', () => {
      products.forEach((product, index) => {
        expect(page.getProductName(index)).toEqual(product.name);
      });
    });

    it('each product name a hover note to product details', () => {
      products.forEach((product, index) => {
        expect(page.getProductLinkHoverText(index)).toEqual(product.name + ' details');
      });
    });
  });
});
