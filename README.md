# YourFirstApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.18.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

    ng add @angular/material
    
## Unit test and e2e test comparison

# Unit test

```javascript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TopBarComponent } from './top-bar.component';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBarComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toEqual('My Store');
  });

  it(`title should link to '/'`, () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a:nth-child(1)').getAttribute('href')).toEqual('/');
  });
});
``` 

# e2e test
```javascript
import { browser, logging } from 'protractor';

import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  describe('top-bar', () => {
    it('should display title', () => {
      page.navigateTo();
      expect(page.getTitleText()).toEqual('My Store');
    });

    it(`title should link to '/'`, () => {
      expect(page.getTitleLink()).toEqual(browser.baseUrl);
    });
  });
});
```
    
## Errors

# TopBarComponent > should create
```htnl
<a [routerLink]="['/']">
  <h1>My Store</h1>
</a>
```
Error message: 

```text
Error: Template parse errors:
        Can't bind to 'routerLink' since it isn't a known property of 'a'. ("<a [ERROR ->][routerLink]="['/']">
          <h1>My Store</h1>
        </a>
```

Solution: import RouterTestingModule

```javascript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TopBarComponent } from './top-bar.component';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBarComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));
```

# AppComponent > should create the app
Error message:
```text
1. If 'app-top-bar' is an Angular component, then verify that it is part of this module.
2. If 'app-top-bar' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message. ("[ERROR ->]<app-top-bar></app-top-bar>
        error properties: Object({ ngSyntaxError: true, ngParseErrors: [ 'app-top-bar' is not a known element:
        "): ng:///DynamicTestModule/AppComponent.html@0:0 ] })
```

Solution: declare TopBarComponent in app.component.spec.ts

# webdriver-manager update, when try to run e2e test
Error Message:

```text
E/direct - Error code: 135
[16:38:24] E/direct - Error message: Could not find update-config.json. Run 'webdriver-manager update' to download binaries.
[16:38:24] E/direct - Error: Could not find update-config.json. Run 'webdriver-manager update' to download binaries.
```

Solution: update webdriver-manager first

    $ npx webdriver-manager update

# more than one element found
```javascript
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

  clickTitle() {
    return element(by.css('h1')).click() as Promise<void>;
  }

  clickCheckoutButton() {
    return element(by.css('app-top-bar > a.button')).click() as Promise<void>;
  }
}
```
Error message

```text
top-bar
      ✓ should display title
[17:33:28] W/element - more than one element found for locator By(css selector, app-top-bar > a) - the first result will be used
      ✓ title should link to '/'
      ✓ clicking checkout should navigate to shopping cart
      ✓ clicking title should navigate to home
```

Solution: 
```javascript
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
}
```

# try to run e2e while your Angular CLI serve the app on port 4200

your angular.json
```json
       "e2e": {
          "builder": "@angular-devkit/build-angular:protractor",
          "options": {
            "protractorConfig": "e2e/protractor.conf.js",
            "devServerTarget": "your-first-app:serve"
          },
          "configurations": {
            "production": {
              "devServerTarget": "your-first-app:serve:production"
            }
          }
        }
``` 

Error message:
```text
[17:56:30] I/update - chromedriver: chromedriver_78.0.3904.70 up to date
An unhandled exception occurred: Port 4200 is already in use. Use '--port' to specify a different port.
See "/private/var/folders/5r/qsspvwt125l24gh8m_tp06c40000gp/T/ng-HTOG0n/angular-errors.log" for further details.
npm ERR! code ELIFECYCLE
npm ERR! syscall spawn
npm ERR! file sh
npm ERR! errno ENOENT
npm ERR! your-first-app@0.0.0 e2e: `ng e2e`
npm ERR! spawn ENOENT
npm ERR! 
npm ERR! Failed at the your-first-app@0.0.0 e2e script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/xxxxxx/.npm/_logs/2019-11-09T22_56_40_812Z-debug.log

Process finished with exit code 1
``` 

Solution:
add a different port (e.g. 4201) to your angular.json 
```json
"e2e": {
          "builder": "@angular-devkit/build-angular:protractor",
          "options": {
            "protractorConfig": "e2e/protractor.conf.js",
            "devServerTarget": "your-first-app:serve",
            "port": 4201
          },
          "configurations": {
            "production": {
              "devServerTarget": "your-first-app:serve:production"
            }
          }
        }
```

# searchig for non existing elemenet
```javascript
it('should show description', () => {
      products.forEach((product, index) => {
        if (product.description) {
          expect(page.getProductDescription(index)).toEqual('Description: ' + product.description);
        } else {
          expect(page.getProductDescription(index)).toEqual('');
        }
      });
});
```
Error message:

```text
 ✗ should show description
        - Failed: No element found using locator: By(css selector, #product2 > p)
            at elementArrayFinder.getWebElements.then (/Users/girmae.nigusse/angular/your-first-app/node_modules/protractor/built/element.js:814:27)
```
Solution:
```javascript
  hasProductDescription(index) {
    return element(by.css(`#product${index} > p`)).isPresent() as Promise<boolean>;
  }
```

```javascript
it('should show description', () => {
      products.forEach((product, index) => {
        if (product.description) {
          expect(page.getProductDescription(index)).toEqual('Description: ' + product.description);
        } else {
          expect(page.hasProductDescription(index)).toBe(false);
        }
      });
});
```

# Error: <spyOn> : alert has already been spied upon
```javascript
it('shared button should have alert when clicked', () => {
    const compiled = fixture.debugElement.nativeElement;
    products.forEach((product, index) => {
      let button: DebugElement;
      button = fixture.debugElement.query(By.css(`#product${index} > button`));

      const spy = spyOn(window, 'alert');
      button.triggerEventHandler('click', null);
      expect(window.alert).toHaveBeenCalledWith(`Product ${product.name} has been shared!`);
    });
  });
```

Error message:
```text
Error: <spyOn> : alert has already been spied upon
        Usage: spyOn(<object>, <methodName>)
            at <Jasmine>
```
Solution:
```javascript
it('shared button should have alert when clicked', () => {
    const compiled = fixture.debugElement.nativeElement;
    products.forEach((product, index) => {
      let button: DebugElement;
      button = fixture.debugElement.query(By.css(`#product${index} > button`));

      const spy = spyOn(window, 'alert');
      button.triggerEventHandler('click', null);
      expect(window.alert).toHaveBeenCalledWith(`Product ${product.name} has been shared!`);
      jasmine.getEnv().allowRespy(true);
      spy.calls.reset();
    });
  });
```

# when adding import { HttpClient } from '@angular/common/http';
```javascript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];

  constructor(
    private http: HttpClient
  ) { }

  addToCart(product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
```

Error message:
```text
NullInjectorError: StaticInjectorError(DynamicTestModule)[HttpClient]: 
  StaticInjectorError(Platform: core)[HttpClient]: 
    NullInjectorError: No provider for HttpClient!
```

Solution: add HttpClientTestingModule
```javascript
import {async, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CartService } from './cart.service';
import { products } from './products';

describe('CartService', () => {
  let service: CartService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    })
      .compileComponents();
  }));
```

# add import { FormBuilder } from '@angular/forms';

```javascript
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items;
  checkoutForm;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.items = this.cartService.getItems();
  }
}
```

Error message:
```text
NullInjectorError: StaticInjectorError(DynamicTestModule)[CartComponent -> FormBuilder]: 
  StaticInjectorError(Platform: core)[CartComponent -> FormBuilder]: 
    NullInjectorError: No provider for FormBuilder!
```

Solution: add ReactiveFormsModule

```javascript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule ]
    })
    .compileComponents();
  }));
```
