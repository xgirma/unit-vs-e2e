import { browser, by, element } from 'protractor';

export class AppTopBar {
  appTitle = element(by.css('#title > h1'));
  appTitleLink = element(by.css('#title'));
  checkoutButton = element(by.css('#checkout'));

  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getAppTitleText() {
    return this.appTitle.getText() as Promise<string>;
  }

  getAppTitleLink() {
    return this.appTitleLink.getAttribute('href') as Promise<string>;
  }

  clickAppTitle() {
    return this.appTitle.click() as Promise<void>;
  }

  clickCheckoutButton() {
    return this.checkoutButton.click() as Promise<void>;
  }

  getCheckoutButtonLink() {
    return this.checkoutButton.getAttribute('href') as Promise<string>;
  }
}
