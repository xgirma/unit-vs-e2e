import { browser, ExpectedConditions, logging } from 'protractor';

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
      page.navigateTo(); // to reset if navigation fails before reaching here
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

    it('should show description', () => {
      products.forEach((product, index) => {
        if (product.description) {
          expect(page.getProductDescription(index)).toEqual('Description: ' + product.description);
        } else {
          expect(page.hasProductDescription(index)).toBe(false);
        }
      });
    });

    it('clicking share should open alert', () => {
      products.forEach((product, index) => {
        page.clickShareButton(index);
        browser.wait(ExpectedConditions.alertIsPresent(), 5000, 'Alert not present');
        const alert = browser.switchTo().alert();
        expect(alert.getText()).toEqual(`Product ${product.name} has been shared!`);
        alert.accept();
      });
    });

    it('price > 700 should have notification', () => {
      products.forEach((product, index) => {
        if (product.price > 700) {
          page.clickNotifyMeButton(index);
          browser.wait(ExpectedConditions.alertIsPresent(), 5000, 'Alert not present');
          const alert = browser.switchTo().alert();
          expect(alert.getText()).toEqual('You will be notified when the product goes on sale');
          alert.accept();
        } else {
          expect(page.hasNotifyMeButton(index)).toBe(false);
        }
      });
    });

    it('product name should have product details link', () => {
      products.forEach((product, index) => {
        expect(page.getProductNameLinText(index)).toEqual(`${browser.baseUrl}products/${index}`);
      });
    });
  });
});
