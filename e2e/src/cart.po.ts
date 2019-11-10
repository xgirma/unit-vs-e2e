import { browser, by, element } from 'protractor';

export class AppCart {
  pageTitle = element(by.css('h2'));
  name = element(by.css('.span:nth-child(1)'));
  price = element(by.css('.span:nth-child(2)'));

  navigateTo() {
    return browser.get(browser.baseUrl + 'cart') as Promise<any>;
  }

  getProductName() {
    return this.name.getText() as Promise<string>;
  }

  getProductPrice() {
    return this.price.getText() as Promise<string>;
  }
}
