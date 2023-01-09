import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItemsType={
  id:string;
  name:string;
  types:string;
  sizes:number;
  price:number;
  count:number;
  imageUrl:string;
}

interface CartSliceType{
  totalPrice: number;
  items: CartItemsType[]
}

const initialState:CartSliceType = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    setItems: (state, action:PayloadAction<CartItemsType>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, arr) => {
        return arr.count * arr.price + sum;
      }, 0);
    },
    minusItems(state, action:PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, arr) => {
        return arr.count * arr.price + sum;
      }, 0);
    },
    removeItems: (state, action) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// селектор для более удобного обращения к STATE
export const selectCart = (state:RootState) => state.cartSlice;
export const selectCartSlice = (id:string) => (state:RootState) =>
  state.cartSlice.items.find((obj) => obj.id === id);

export const { setItems, minusItems, clearItems, removeItems } = cartSlice.actions;

export default cartSlice.reducer;
