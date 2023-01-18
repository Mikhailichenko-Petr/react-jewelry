export type CartItemsType={
  id:string;
  name:string;
  types:string;
  sizes:number;
  price:number;
  count:number;
  imageUrl:string;
}

export interface CartSliceType{
  totalPrice: number;
  items: CartItemsType[]
}