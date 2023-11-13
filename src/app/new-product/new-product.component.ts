import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartItem, IProduct } from '../models/app.models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectProducts } from '../state/products-state/products.selectors';
import { addProduct } from '../state/products-state/products.actions';
import { selectCart } from '../state/cart-state/cart.selectors';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {

  products$: Observable<IProduct[]>;
    productForm: FormGroup;
    currentId: number = 6;
    selectedProduct: IProduct | null =null;
    totalQuantity: number = 0;
    cart$: Observable<ICartItem[]>;
    
  

    constructor(private store: Store<any>, private formBuilder: FormBuilder, private r : Router) {
      this.products$ = this.store.select(selectProducts);
      this.cart$ = this.store.select(selectCart);
      this.productForm = this.formBuilder.group({
        name: '',
        description: '',
        price: -1
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
    addnewProduct() {
      if (this.productForm.value.price as number > 0 
          && (this.productForm.value.name as string).trim().length > 0
          && (this.productForm.value.description as string).trim().length > 0) {

        var newProduct: IProduct = {
          id: this.currentId,
          name: this.productForm.value.name as string,
          description: this.productForm.value.description as string,
          price: this.productForm.value.price as number,
          imageUrl: this.productForm.value.imageUrl as string,
          purchaseDates: this.productForm.value.purchaseDates as Date[]
          
        };

        this.currentId = this.currentId + 1;
        this.store.dispatch(addProduct({ product: newProduct }));
      }
      this.r.navigate(["/products"]);
    }
    

    handleImageUpload(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      const file = (inputElement.files as FileList)[0];

        if (file.type.startsWith('image/')) {
          const formData = new FormData();
          formData.append('image', file, file.name);
          console.log(file);
    
        } else {
          console.log('קובץ לא תמונה');
        }
      
    }
    ngOnInit() {
      this.cart$.subscribe(cart => {
        this.totalQuantity = cart.reduce((acc, currentItem) => acc + currentItem.quantity, 0);
      });
    }
    

}
