import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
    expect(component.share()).not.toBeDefined();
  });

  it(`should have sub-title 'product'`, () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toEqual('Products');
  });

  it('should show products name', () => {
    const compiled = fixture.debugElement.nativeElement;
    products.forEach((product, index) => {
      expect(compiled.querySelector(`#product${index} > h3 > a`).textContent).toEqual(product.name);
    });
  });

  it('each product name a hover note to product details', () => {
    const compiled = fixture.debugElement.nativeElement;
    products.forEach((product, index) => {
      expect(compiled.querySelector(`#product${index} > h3 > a`).getAttribute('title')).toEqual(product.name + ' details');
    });
  });
});
