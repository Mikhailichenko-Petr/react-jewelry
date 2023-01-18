import { CartItemsType } from '../redux/cart/types';
import { TotalPrice } from './TotalPriceLocalStorage';
export const GetCartLocalStorage=()=>{
    const data = localStorage.getItem('items')
    const items = data ? JSON.parse(data) :[]
    const totalPrice = TotalPrice(items)

    return {
        items: items as CartItemsType[],
        totalPrice
    }
}