import { createReducer, on } from '@ngrx/store';
import { addProduct, removeProduct, updateProduct } from './products.actions';
import { IProduct } from 'src/app/models/app.models';
import { products } from 'src/app/storage';

export interface ProductsState {
  products: IProduct[];
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success'
}

export const initialState: ProductsState = {
  products: products,
  error: null,
  status: 'pending'
}

export const productsReducer = createReducer(
  initialState,
  on(addProduct, (state, { product }) => ({...state, products: state.products.concat([product])})),
  on(removeProduct, (state, { id }) => ({...state, products: state.products.filter((item) => item.id != id)})),
  on(updateProduct, (state, { product }) => {
    const updatedProducts = state.products.map(item => {
      if (item.id === product.id) {
        return { ...item, ...product };
      }
      return item;
    });

    return { ...state, products: updatedProducts };
  })  
);