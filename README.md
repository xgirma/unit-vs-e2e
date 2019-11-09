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
