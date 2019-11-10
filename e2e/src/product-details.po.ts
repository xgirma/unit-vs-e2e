import { browser, by, element } from 'protractor';

export class AppProductDetails {
  pageTitle = element(by.css('app-product-details > h2'));
  name = element(by.css('app-product-details > div> h3'));
  price = element(by.css('app-product-details > div> h4'));
  description = element(by.css('app-product-details > div >  p'));
  button = element(by.css('app-product-details > div >  button'));

  navigateTo(index = 0) {
    return browser.get(browser.baseUrl + 'products' + `/${index}`) as Promise<any>;
  }

  getPageTitle() {
    return this.pageTitle.getText() as Promise<string>;
  }

  getProductName() {
    return this.name.getText() as Promise<string>;
  }

  getProductPrice() {
    return this.price.getText() as Promise<string>;
  }

  getProductDescription() {
    return this.description.getText() as Promise<string>;
  }

  clickBuyButton() {
    return this.button.click() as Promise<void>;
  }
}
