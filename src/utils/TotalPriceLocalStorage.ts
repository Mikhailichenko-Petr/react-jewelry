import { CartItemsType } from "../redux/cart/types";


export const TotalPrice=(items:CartItemsType[])=>items.reduce((sum, arr) => { return arr.count * arr.price + sum}, 0);
