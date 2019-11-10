import { browser, by, element } from 'protractor';

export class AppPage {
  title = element(by.css('#title > h1'));
  titleLink = element(by.css('#title'));
  checkoutButton = element(by.css('#checkout'));
  productTitle = element(by.css('h2'));

  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return this.title.getText() as Promise<string>;
  }

  getTitleLink() {
    return this.titleLink.getAttribute('href') as Promise<string>;
  }

  clickTitle() {
    return this.title.click() as Promise<void>;
  }

  clickCheckoutButton() {
    return this.checkoutButton.click() as Promise<void>;
  }

  getCheckoutButtonLink() {
    return this.checkoutButton.getAttribute('href') as Promise<string>;
  }

  getProductTitle() {
    return this.productTitle.getText() as Promise<string>;
  }

  getProductName(index) {
    return element(by.css(`#product${index} > h3 > a`)).getText() as Promise<string>;
  }

  getProductLinkHoverText(index) {
    return element(by.css(`#product${index} > h3 > a`)).getAttribute('title') as Promise<string>;
  }

  getProductDescription(index) {
    return element(by.css(`#product${index} > p`)).getText() as Promise<string>;
  }

  hasProductDescription(index) {
    return element(by.css(`#product${index} > p`)).isPresent() as Promise<boolean>;
  }
}
