
export interface IProduct {
    id: number,
    name: string,
    description: string,
    price: number
    imageUrl : string,
    purchaseDates: Date[];
}

export interface ICartItem {
    product: IProduct,
    quantity: number,
    available: boolean,
    addedDate: Date[];
    additions?: ICartItem[];
}
