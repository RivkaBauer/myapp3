import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import {StoreModule} from '@ngrx/store';
import { cartReducer } from './state/cart-state/cart.reducer';
import { productsReducer } from './state/products-state/products.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomersComponent } from './customers/customers.component';
import { NewProductComponent } from './new-product/new-product.component';


const appRoutes :Routes = [
  {path:"products" , component :ProductsComponent },
  {path:"cart" , component:CartComponent},
  {path :"home", component:HomeComponent},
  {path :"customers", component:CustomersComponent},
  {path :"newProduct", component:NewProductComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CartComponent,
    HomeComponent,
    CustomersComponent,
    NewProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      cart: cartReducer,
      products: productsReducer
    }),
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
