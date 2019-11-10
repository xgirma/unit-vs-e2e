import { browser, by, element } from 'protractor';

export class AppCart {
  pageTitle = element(by.css('h2'));
  name = element.all(by.css('span:nth-child(1)'));
  price = element.all(by.css('span:nth-child(2)'));

  navigateTo() {
    return browser.get(browser.baseUrl + 'cart') as Promise<any>;
  }

  getPageTitle() {
    return this.pageTitle.getText() as Promise<string>;
  }

  getProductName(index) {
    return this.name.get(index).getText() as Promise<string>;
  }

  getProductPrice(index) {
    return this.price.get(index).getText() as Promise<string>;
  }
}
