import {browser, ExpectedConditions} from 'protractor';
import { AppProductList } from './product-list.po';

import { products } from '../../../src/app/products';

describe('product list', () => {
  let page: AppProductList;

  beforeAll(() => {
    page = new AppProductList();
    page.navigateTo();
  });

  it(`should have page title 'Products'`, () => {
    expect(page.getTitle()).toEqual('Products');
  });

  it('should show products name', () => {
    products.forEach((product, index) => {
      expect(page.getName(index)).toEqual(product.name);
    });
  });

  it('hover on name should show tool-tip', () => {
    products.forEach((product, index) => {
      expect(page.getLinkHoverText(index)).toEqual(product.name + ' details');
    });
  });

  it('should show description', () => {
    products.forEach((product, index) => {
      if (product.description) {
        expect(page.getDescription(index)).toEqual('Description: ' + product.description);
      } else {
        expect(page.hasDescription(index)).toBe(false);
      }
    });
  });

  it('clicking share should open alert', () => {
    products.forEach((product, index) => {
      page.clickShare(index);
      browser.wait(ExpectedConditions.alertIsPresent(), 5000, 'Alert not present');
      const alert = browser.switchTo().alert();
      expect(alert.getText()).toEqual(`Product ${product.name} has been shared!`);
      alert.accept();
    });
  });

  it('price > 700 should have notification', () => {
    products.forEach((product, index) => {
      if (product.price > 700) {
        page.clickNotifyMe(index);
        browser.wait(ExpectedConditions.alertIsPresent(), 5000, 'Alert not present');
        const alert = browser.switchTo().alert();
        expect(alert.getText()).toEqual('You will be notified when the product goes on sale');
        alert.accept();
      } else {
        expect(page.hasNotifyMe(index)).toBe(false);
      }
    });
  });

  it('product name should have product details link', () => {
    products.forEach((product, index) => {
      expect(page.getNameLinkText(index)).toEqual(`${browser.baseUrl}products/${index}`);
    });
  });
});
