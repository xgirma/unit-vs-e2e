import { browser, by, element, ExpectedConditions } from 'protractor';

export class AppProductList {
  pageTitle = element(by.css('h2'));

  navigateTo() {
    browser.get(browser.baseUrl);
    return browser.wait(
      ExpectedConditions.urlContains(browser.baseUrl), 5000
    ) as Promise<any>;
  }

  getTitle() {
    return this.pageTitle.getText() as Promise<string>;
  }

  getName(index) {
    return element(by.css(`#product${index} > h3 > a`)).getText() as Promise<string>;
  }

  clickName(index) {
    return element(by.css(`#product${index} > h3 > a`)).click() as Promise<void>;
  }

  getLinkHoverText(index) {
    return element(by.css(`#product${index} > h3 > a`)).getAttribute('title') as Promise<string>;
  }

  getNameLinkText(index) {
    return element(by.css(`#product${index} > h3 > a`)).getAttribute('href') as Promise<string>;
  }

  getDescription(index) {
    return element(by.css(`#product${index} > p`)).getText() as Promise<string>;
  }

  hasDescription(index) {
    return element(by.css(`#product${index} > p`)).isPresent() as Promise<boolean>;
  }

  clickShare(index) {
    return element(by.css(`#product${index} > button`)).click() as Promise<void>;
  }

  clickNotifyMe(index) {
    return element(by.css(`#product${index} > app-product-alert > p > button`)).click() as Promise<void>;
  }

  hasNotifyMe(index) {
    return element(by.css(`#product${index} > app-product-alert > p > button`)).isPresent() as Promise<boolean>;
  }
}
