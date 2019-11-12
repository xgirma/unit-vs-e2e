import { browser, by, element, ExpectedConditions } from 'protractor';

export class AppTopBar {
  topBar = element(by.css('app-top-bar'));
  appTitle = element(by.css('#title > h1'));
  appTitleLink = element(by.css('#title'));
  checkoutButton = element(by.css('#checkout'));

  navigateTo() {
    browser.get(browser.baseUrl);
    return browser.wait(
      ExpectedConditions.urlContains(browser.baseUrl), 5000
    ) as Promise<any>;
  }

  hasTopBar() {
    return this.topBar.isDisplayed() as Promise<boolean>;
  }

  getTitleText() {
    return this.appTitle.getText() as Promise<string>;
  }

  getTitleLink() {
    return this.appTitleLink.getAttribute('href') as Promise<string>;
  }

  clickTitle() {
    return this.appTitle.click() as Promise<void>;
  }

  clickCheckout() {
    return this.checkoutButton.click() as Promise<void>;
  }

  getCheckoutLink() {
    return this.checkoutButton.getAttribute('href') as Promise<string>;
  }
}
