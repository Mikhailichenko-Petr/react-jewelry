import { CartSliceType, CartItemsType } from './types';

import { TotalPrice } from '../../utils/TotalPriceLocalStorage';
import { GetCartLocalStorage } from '../../utils/GetCartLocalStorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const {totalPrice,items} = GetCartLocalStorage()

const initialState:CartSliceType = {
  totalPrice,
  items
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
      state.totalPrice = TotalPrice(state.items)
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


export const { setItems, minusItems, clearItems, removeItems } = cartSlice.actions;

export default cartSlice.reducer;
