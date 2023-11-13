import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICartItem } from '../models/app.models';
import { Store } from '@ngrx/store';
import { selectCart } from '../state/cart-state/cart.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

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
