import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ICartItem, IProduct } from "src/app/models/app.models";
import { addProductToCart, setProductInCartToSoldOut } from "src/app/state/cart-state/cart.actions";
import { addProduct, removeProduct, updateProduct } from "src/app/state/products-state/products.actions";
import { selectProducts } from "src/app/state/products-state/products.selectors";
import { selectCart } from "../state/cart-state/cart.selectors";


@Component({
  selector: 'products-component',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})

export class ProductsComponent {
  products$: Observable<IProduct[]>;
  productForm: FormGroup;
  currentId: number = 6;
  selectedProduct: IProduct | null = null;
  totalQuantity: number = 0;
  cart$: Observable<ICartItem[]>;

  constructor(private store: Store<any>, private formBuilder: FormBuilder, private r: Router) {
    this.products$ = this.store.select(selectProducts);
    this.cart$ = this.store.select(selectCart);
    this.productForm = this.formBuilder.group({
      name: '',
      description: '',
      price: -1
    });
  }


  nextHome() {
    this.r.navigate(["/home"])
  }

  nextCustomers() {
    this.r.navigate(["/customers"])
  }

  nextProducts() {
    this.r.navigate(["/products"])
  }

  nextCart() {
    this.r.navigate(["/cart"])
  }

  nextNewProduct() {
    this.r.navigate(["/newProduct"])
  }

  /*addProductToCart(product: IProduct) {
    const cartItem: ICartItem = {
      product: product,
      quantity: 1,
      available: true,
      addedDate:  [new Date()]
    };
    this.store.dispatch(addProductToCart({ product: product, quantity: 1 }));
  }*/
  addProductToCart(product: IProduct) {
    const cartItem: ICartItem = {
      product: product,
      quantity: 1,
      available: true,
      addedDate: [new Date()]
    };
  
    const updatedProduct: IProduct = {
      ...product,
      purchaseDates: [...(product.purchaseDates || []), new Date()] // הוספת התאריך החדש למערך התאריכים
    };

    if (updatedProduct.purchaseDates.every(date => date instanceof Date)) {
      this.store.dispatch(addProductToCart({ product: updatedProduct, quantity: 1 }));
    } else {
      console.error('Invalid date format');
    }
  
  }
  
  
  handleImageUpload(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = (inputElement.files as FileList)[0];

  }

  removeProduct(id: number) {
    this.store.dispatch(removeProduct({ id: id }));
    this.store.dispatch(setProductInCartToSoldOut({ id: id }));
    
  }

  

  editProduct(product: IProduct) {
    this.selectedProduct = product;
  }

  updateSelectedProduct(updatedData: Partial<IProduct>) {
    if (this.selectedProduct) {
      this.selectedProduct = { ...this.selectedProduct, ...updatedData };
    }
  }
  editSelectedProduct() {
    if (this.selectedProduct) {
      if (this.productForm.valid) {
        const editedProduct: IProduct = {
          id: this.selectedProduct.id,
          name: this.productForm.value.name as string,
          description: this.productForm.value.description as string,
          price: this.productForm.value.price as number,
          imageUrl: this.productForm.value.imageUrl as string,
          purchaseDates: [...(this.selectedProduct.purchaseDates || []), new Date()] 
        };
        console.log(this.productForm.value);
        this.store.dispatch(updateProduct({ product: editedProduct }));
        this.updateSelectedProduct(editedProduct);
      }

    }
  }

  ngOnInit() {
    this.cart$.subscribe(cart => {
      this.totalQuantity = cart.reduce((acc, currentItem) => acc + currentItem.quantity, 0);
    });

  }

}
