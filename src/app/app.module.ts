import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAlertComponent } from './product-alert/product-alert.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShippingComponent } from './shipping/shipping.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    CartComponent,
    ProductListComponent,
    ProductAlertComponent,
    ProductDetailsComponent,
    ShippingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'cart', component: CartComponent },
      { path: '', component: ProductListComponent },
      { path: 'products/:productId', component: ProductDetailsComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
