import { ICartItem, IProduct } from "./models/app.models";


export var products: IProduct[] = [
    { id: 1,
         name: 'iPhone 15 Pro',
          description: '6.1-inch Super Retina XDR display footnote featuring ProMotion, Always-On, and Dynamic Island',
           price: 5449,
           imageUrl:'assets/images/iPhone 15 Pro.png',
           purchaseDates: []
         },
    { id: 2,
         name: 'iPhone 15 Pro Max',
          description: '6.7-inch Super Retina XDR display footnote featuring ProMotion, Always-On, and Dynamic Island',
           price: 6499,
           imageUrl:'assets/images/iPhone 15 Pro Max.png',
          purchaseDates: []  },
    { id: 3,
         name: 'iPhone 15',
          description: '6.1-inch durable color-infused glass and aluminum design footnote ◊ with Ceramic Shield front',
           price: 4299,
           imageUrl:'assets/images/iPhone 15.png',
           purchaseDates: []  },
    { id: 4, 
        name: 'Iphone 14',
         description: '6.1-inch durable design footnote ¹ with Ceramic Shield and water and dust resistance',
          price: 3799,
          imageUrl:'assets/images/iPhone 14.png' ,
          purchaseDates: [] },
    { id: 5,
         name: 'iPhone 14 Plus',
          description: '6.7-inch durable design footnote ¹ with Ceramic Shield and water and dust resistance',
           price: 5399,
           imageUrl:'assets/images/iPhone 14 Plus.png' ,
           purchaseDates: [] }
];

export var cart: ICartItem[] = [
   // { product: products[0], quantity: 2, available: true,addedDate:[ new Date('2020-09-08'),new Date('2023-10-10')] },
   // { product: products[1], quantity: 3, available: true,addedDate:[ new Date('2023-10-10'),new Date('2021-09-09'),new Date('2022-06-06')] }
];


 