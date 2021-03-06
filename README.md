# Whether to unit-test and/or end-to-end test
[![GitHub Actions status | xgirma/unit-vs-e2e](https://github.com/xgirma/unit-vs-e2e/workflows/NodeCI/badge.svg)](https://github.com/xgirma/unit-vs-e2e/actions?workflow=NodeCI)

This app is based on [Getting Started with Angular: Your First App](https://angular.io/start). 
Few changes are introduced to add element selectors. 
Getting started instructions found [here](https://github.com/xgirma/unit-vs-e2e/blob/master/docs/getting.started.md). 
If you encounter errors look [here](https://github.com/xgirma/unit-vs-e2e/blob/master/docs/google.is.your.friend.md) or 
create an issue with this [template](https://github.com/xgirma/unit-vs-e2e/blob/master/.github/ISSUE_TEMPLATE/bug_report.md).

## Testing Pyramid
<img width="1179" alt="Screen Shot 2019-11-11 at 12 03 08 AM" src="https://user-images.githubusercontent.com/5876481/68562273-e9693800-0416-11ea-9db2-4c29d87e0841.png">

Which testing approach? a, b, or c.

    a. pyramid 
    b. box
    c. cone

## Background
[Your First App](https://angular.io/start) is a small Angular application containing the four pages, shown below. Click [here](https://xgirma.github.io/unit-vs-e2e/) if you would like to see the deployed application.

<img width="1179" alt="Screen Shot 2019-11-11 at 12 48 06 AM" src="https://user-images.githubusercontent.com/5876481/68563873-0274e780-041d-11ea-9876-6d39dc5f3f2e.png">

Products page display list of products. 
Details page display product details. 
Cart page display items added to the cart. 
Shipping page shows shipping options. 

The goal is to attempt to get near-full unit- and e2e-test coverage for each of the pages and a service. 
On doing so suggest which testing model is viable for the app.

## Limitations
Only a single front-end framework [Angular](https://angular.io) and a single integration 
test framework [Protractor](http://www.protractortest.org/#/) is used. 
Testability varies from one framework to another. Using different frameworks 
may present a different result.<sup id="a1">[1](#f1)</sup>
   
What is a unit of software-code is arguable. 
We use Angular's classification of application modules; such as components and 
services, to classify the application into seven-units.  

Many other testing types between unit-tests and e2e-tests are not covered.

Purposefully, we will attempt to create a one-to-one correspondence between 
each unit-test and e2e-test assertions for comparison.

The tests are executed using: OS X Catalina 10.15.1, Mac mini (2018), Processor: 3 GHz 6-Core, 
Intel Core i5, Memory: 8 GB 2667 MHz DDR4, WebStorm: 2019.2.3, and Chrome Browser (incognito) 78.0.3904.

## Measurement 
The following requirements will help us to find a suitable testing model for each unit 
and use that to infer a model for the whole application. 

    1. for each unit test, there is a corresponding e2e test
    2. for each e2e test, there a corresponding unit test
    3. n/m assertions, can only be tested with unit test, 
    4. n/m assertions, can only be tested with e2e test
    5. integration and isolation testing threadoffs 
    6. test execution time

## Units of application
The seven units of the application constitute top-bar, product-list, product-detail, product-alert, 
cart, shipping, and the cart-service. 

### 1. top-bar
The top-blue-bar (top-bar) has three functionality, displaying title, clicking the title should 
navigate us back to the home page, and clicking the Checkout button should navigate us to the cart page. 

Below is an implementation of these requirements using unit- and e2e-tests.

[unit ↩](https://github.com/xgirma/unit-vs-e2e/blob/master/src/app/top-bar/top-bar.component.spec.ts)
```javascript
it('should create', () => {
  expect(component).toBeTruthy();
});

it('should display title', () => {
  const el = compiled.querySelector('#title > h1');
  expect(el.textContent).toEqual('My Store');
});

it(`title should link to '/'`, () => {
  const el = compiled.querySelector('#title');
  expect(el.getAttribute('href')).toEqual('/');
});

it(`checkout button should link to '/cart'`, () => {
  const el = compiled.querySelector('#checkout');
  expect(el.getAttribute('href')).toEqual('/cart');
});
``` 
[e2e ↩](https://github.com/xgirma/unit-vs-e2e/blob/master/e2e/src/top-bar/top-bar.e2e-spec.ts)
```javascript
it('should have top-bar', () => {
  expect(page.hasTopBar()).toBeTruthy();
});

it('should display title', () => {
  expect(page.getTitleText()).toEqual('My Store');
});

it(`checkout button should link to '/cart'`, () => {
  expect(page.getCheckoutLink()).toEqual(baseUrl + 'cart');
  page.clickCheckout();
  expect(browser.getCurrentUrl()).toEqual(baseUrl + 'cart');
});

it(`title should link to '/'`, () => {
  expect(page.getTitleLink()).toEqual(baseUrl);
  page.clickTitle();
  expect(browser.getCurrentUrl()).toEqual(baseUrl);
});
```
There is a one-to-one correspondence since every feature of the application could be tested using either a unit- or an e2e test. 
When taken the slowest data, the unit-test runs six times faster than the e2e test. 
The level of integration and isolation tested in both types are nearly the same. 

    For each unit test, there is a corresponding e2e test
    For each e2e test, there a corresponding unit test
    Minimal integration and isolation testing threadoff
    Test execution time: unit-test ~ 380ms and e2e-test ~ 1s 996ms 

If speed is not a concern [↩](https://github.com/xgirma/unit-vs-e2e/blob/master/docs/test-results/top-bar.md), the box model could be used for testing the top-box. 

### 2. product list
Products are listed on the product list page. A user could share a product by clicking the share button, 
get notification using the notification button, or click the product name to navigate to the product details page.

 




--------------
<b id="f1">1</b> Extended future work might be trying the same application in different frameworks and see if the result found to have some correlations. [↩](#a1)
