import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductListComponent } from './product-list.component';
import { ProductAlertComponent } from '../product-alert/product-alert.component';
import { products } from '../products';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListComponent, ProductAlertComponent],
      imports: [ RouterTestingModule ]
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

  it('price > 700 should have notification', () => {
    products.forEach((product, index) => {
      let button: DebugElement;
      if (product.price > 700) {
        button = fixture.debugElement.query(By.css(`#product${index} > app-product-alert > p > button`));

        const spy = spyOn(window, 'alert');
        button.triggerEventHandler('click', null);
        expect(window.alert).toHaveBeenCalledWith(`You will be notified when the product goes on sale`);
        jasmine.getEnv().allowRespy(true);
        spy.calls.reset();
      } else {
        button = fixture.debugElement.query(By.css(`#product${index} > app-product-alert > p > button`));
        expect(button).toBeNull();
      }
    });
  });

  it('product name should have product details link', () => {
    const compiled = fixture.debugElement.nativeElement;
    products.forEach((product, index) => {
      expect(compiled.querySelector(`#product${index} > h3 > a`).getAttribute('href'))
        .toEqual(`/products/${index}`);
    });
  });
});
