import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCart } from '../state/cart-state/cart.selectors';
import { ICartItem } from '../models/app.models';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {

  totalQuantity: number = 0;
  cart$: Observable<ICartItem[]>;

  constructor(private store: Store<any>,private r : Router) {
    this.cart$ = this.store.select(selectCart);}

  nextHome(){
    this.r.navigate(["/home"])
  }

  nextCustomers(){
    this.r.navigate(["/customers"])
  }
  
  nextProducts(){
    this.r.navigate(["/products"])
  }

  nextCart(){
    this.r.navigate(["/cart"])
  }

  ngOnInit() {
    this.cart$.subscribe(cart => {
      this.totalQuantity = cart.reduce((acc, currentItem) => acc + currentItem.quantity, 0);
    });
  }

}
