import { browser, by, element } from 'protractor';

export class AppPage {
  appTitle = element(by.css('#title > h1'));
  appTitleLink = element(by.css('#title'));
  checkoutButton = element(by.css('#checkout'));
  pageTitle = element(by.css('h2'));

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

  getPageTitle() {
    return this.pageTitle.getText() as Promise<string>;
  }

  getProductName(index) {
    return element(by.css(`#product${index} > h3 > a`)).getText() as Promise<string>;
  }

  clickProductName(index) {
    return element(by.css(`#product${index} > h3 > a`)).click() as Promise<void>;
  }

  getProductLinkHoverText(index) {
    return element(by.css(`#product${index} > h3 > a`)).getAttribute('title') as Promise<string>;
  }

  getProductNameLinText(index) {
    return element(by.css(`#product${index} > h3 > a`)).getAttribute('href') as Promise<string>;
  }

  getProductDescription(index) {
    return element(by.css(`#product${index} > p`)).getText() as Promise<string>;
  }

  hasProductDescription(index) {
    return element(by.css(`#product${index} > p`)).isPresent() as Promise<boolean>;
  }

  clickShareButton(index) {
    return element(by.css(`#product${index} > button`)).click() as Promise<void>;
  }

  clickNotifyMeButton(index) {
    return element(by.css(`#product${index} > app-product-alert > p > button`)).click() as Promise<void>;
  }

  hasNotifyMeButton(index) {
    return element(by.css(`#product${index} > app-product-alert > p > button`)).isPresent() as Promise<boolean>;
  }
}
