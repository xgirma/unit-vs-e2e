import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { products } from './products';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.get(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product', () => {
    expect(service.items.length).toBe(0);
    service.addToCart(products[0]);
    expect(service.items.length).toBe(1);
  });

  it('should get products', () => {
    expect(service.items.length).toBe(0);
    service.addToCart(products[0]);
    expect(service.getItems()).toEqual([products[0]]);
  });

  it('should clear products', () => {
    expect(service.items.length).toBe(0);
    service.addToCart(products[0]);
    expect(service.getItems()).toEqual([products[0]]);
    service.clearCart();
    expect(service.items.length).toBe(0);
  });
});
