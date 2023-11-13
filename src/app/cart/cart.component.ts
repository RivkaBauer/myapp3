import { Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { removeProductFromCart } from '../state/cart-state/cart.actions';
import { selectCart } from 'src/app/state/cart-state/cart.selectors';
import { ICartItem } from 'src/app/models/app.models';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cart-component',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  totalQuantity: number = 0;
  searchTerm: string = ''; 
  filteredCart: any[] = [];
  cart$: Observable<ICartItem[]>;
 
  constructor(private store: Store<any>,private r : Router) {
    this.cart$ = this.store.select(selectCart);

    this.cart$.subscribe(cart => {
      this.filteredCart = cart;
      this.onSearchTermChange();
    });
  }
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
 
  removeProductFromCart(id: number) {
    this.store.dispatch(removeProductFromCart({ id: id }));
  }

 
  onSearchTermChange() {
    this.cart$.subscribe(cart => {
      this.filteredCart = cart.filter(item =>
        item.product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }
  
   filterCart(cart: ICartItem[]): ICartItem[] {
    return cart.map(cartItem => {
      const occurrences = cart.filter(item => item.product.id === cartItem.product.id).length;
      if (occurrences > 1) {
        const additions = cart.filter(item => item.product.id === cartItem.product.id);
        return { ...cartItem, additions };
      }
      return cartItem;
    }).map(item => {
      if (item.additions) {
        item.additions.forEach(addition => {
          if (!(addition instanceof Date) && !Array.isArray(addition) ) {
            console.error('Invalid date format:', addition);
          }
        });
      }
      return item;
    });
    
  }
  ngOnInit() {
    this.cart$.subscribe(cart => {
      this.filteredCart = this.filterCart(cart);
      this.totalQuantity = cart.reduce((acc, currentItem) => acc + currentItem.quantity, 0);

    });
  }

}
