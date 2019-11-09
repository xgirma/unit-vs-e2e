import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('h1')).getText() as Promise<string>;
  }

  getTitleLink() {
    return element(by.css('app-top-bar > a')).getAttribute('href') as Promise<string>;
  }
}
