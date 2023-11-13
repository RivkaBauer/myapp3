import { createAction, props } from "@ngrx/store";
import { IProduct } from "src/app/models/app.models";

enum productActions {
    addProduct = "[Product] Add product",
    removeProduct = "[Product] Remove product",
    updateProduct = "[product] Update product"
};

export const addProduct = createAction(
    productActions.addProduct, props<{ product: IProduct }>());
export const removeProduct = createAction(
    productActions.removeProduct, props<{ id: number}>());
export const updateProduct = createAction( 
    productActions.updateProduct, props<{ product: IProduct }>());
