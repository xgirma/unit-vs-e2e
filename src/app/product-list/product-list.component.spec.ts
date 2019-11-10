import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ProductListComponent } from './product-list.component';
import { products } from '../products';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have products', () => {
    expect(component.products).toBeDefined();
  });

  it(`should have share(): void method`, () => {
    products.forEach(product => {
      expect(component.share(product.name)).not.toBeDefined();
    });
  });

  it(`should have sub-title 'product'`, () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toEqual('Products');
  });

  it('should show products name', () => {
    const compiled = fixture.debugElement.nativeElement;
    products.forEach((product, index) => {
      expect(compiled.querySelector(`#product${index} > h3 > a`).textContent)
        .toEqual(product.name);
    });
  });

  it('each product name a hover note to product details', () => {
    const compiled = fixture.debugElement.nativeElement;
    products.forEach((product, index) => {
      expect(compiled.querySelector(`#product${index} > h3 > a`).getAttribute('title'))
        .toEqual(product.name + ' details');
    });
  });

  it('should show description', () => {
    const compiled = fixture.debugElement.nativeElement;
    products.forEach((product, index) => {
      if (product.description) {
        expect(compiled.querySelector(`#product${index} > p`).textContent)
          .toEqual('Description: ' + product.description);
      } else {
        expect(compiled.querySelector(`#product${index} > p`)).toBeNull();
      }
    });
  });

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
});
