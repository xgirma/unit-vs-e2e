import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CartService } from './cart.service';
import { products } from './products';

interface IShipping {
  type: string;
  price: number;
}

describe('CartService', () => {
  let service: CartService;
  let backend: HttpTestingController;
  let response: IShipping[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.get(CartService);
      backend = TestBed.get(HttpTestingController);
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

  it('service issue a call for a given url', () => {
    response = [
      {
        type: 'Overnight',
        price: 25
      }
    ];
    service.getShippingPrices().subscribe();
    const call = backend.expectOne(req => {
      return req.url.match('/assets/shipping.json') && req.method === 'GET';
    });
    expect(call.request.method).toEqual('GET');
    expect(call.request.url).toEqual('/assets/shipping.json');
    expect(call.request.responseType).toEqual('json');
    call.flush(response);
    expect(call.cancelled).toBeTruthy();
    backend.verify();
  });
});
