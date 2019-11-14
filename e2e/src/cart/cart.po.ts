import { browser, by, element } from 'protractor';

export class AppCart {
  title = element(by.css('h2'));
  name = element.all(by.css('span:nth-child(1)'));
  price = element.all(by.css('span:nth-child(2)'));

  navigateTo() {
    return browser.get(browser.baseUrl + 'cart') as Promise<any>;
  }

  getTitle() {
    return this.title.getText() as Promise<string>;
  }

  getName(index) {
    return this.name.get(index).getText() as Promise<string>;
  }

  getPrice(index) {
    return this.price.get(index).getText() as Promise<string>;
  }
}
