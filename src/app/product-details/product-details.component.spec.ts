import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductDetailsComponent } from './product-details.component';
import { products } from '../products';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.product = [];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have sub-title 'Product Details''`, () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toEqual('Product Details');
  });

  it('should have product details', () => {
    products.forEach(product => {
      component.product = product;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h3').textContent).toEqual(product.name);
      expect(compiled.querySelector('h4').textContent).toEqual(`$${product.price}.00`);
      expect(compiled.querySelector('p').textContent).toEqual(product.description);
      component.product = {};
    });
  });

  it('should have a buy button', () => {
    products.forEach(product => {
      component.product = product;
      fixture.detectChanges();
      let button: DebugElement;
      button = fixture.debugElement.query(By.css(`button`));

      const spy = spyOn(window, 'alert');
      button.triggerEventHandler('click', null);
      expect(window.alert).toHaveBeenCalledWith('Your product has been added to the cart!');
      jasmine.getEnv().allowRespy(true);
      spy.calls.reset();
      component.product = {};
    });
  });
});
