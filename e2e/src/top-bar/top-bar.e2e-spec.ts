import { browser } from 'protractor';
import { AppTopBar } from './top-bar.po';

const baseUrl = browser.baseUrl;

describe('top-bar', () => {
  let page: AppTopBar;

  beforeAll(() => {
    page = new AppTopBar();
    page.navigateTo();
  });

  it('should have top-bar', () => {
    expect(page.hasTopBar()).toBeTruthy();
  });

  it('should display title', () => {
    expect(page.getTitleText()).toEqual('My Store');
  });

  it(`checkout button should link to '/cart'`, () => {
    expect(page.getCheckoutLink()).toEqual(baseUrl + 'cart');
    page.clickCheckout();
    expect(browser.getCurrentUrl()).toEqual(baseUrl + 'cart');
  });

  it(`title should link to '/'`, () => {
   expect(page.getTitleLink()).toEqual(baseUrl);
   page.clickTitle();
   expect(browser.getCurrentUrl()).toEqual(baseUrl);
  });
});
