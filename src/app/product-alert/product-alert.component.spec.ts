import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductAlertComponent } from './product-alert.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { products } from '../products';

describe('ProductAlertComponent', () => {
  let component: ProductAlertComponent;
  let fixture: ComponentFixture<ProductAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAlertComponent, ProductListComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAlertComponent);
    component = fixture.componentInstance;
    component.product =  products[2];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('price > 700 should have notification', () => {
    products.forEach((product, index) => {
      component.product = products[index];
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;

      if (product.price > 700) {
        expect(compiled.querySelector('p > button')).not.toBeNull();
      } else {
        expect(compiled.querySelector('p > button')).toBeNull();
      }
    });
  });
});
