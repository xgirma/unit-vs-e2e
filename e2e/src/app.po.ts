import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('h1')).getText() as Promise<string>;
  }

  getTitleLink() {
    return element(by.css('a:nth-child(1)')).getAttribute('href') as Promise<string>;
  }

  clickTitle() {
    return element(by.css('h1')).click() as Promise<void>;
  }

  clickCheckoutButton() {
    return element(by.css('app-top-bar > a.button')).click() as Promise<void>;
  }

  getCheckoutButtonLink() {
    return element(by.css('a:nth-child(2)')).getAttribute('href') as Promise<string>;
  }
}
