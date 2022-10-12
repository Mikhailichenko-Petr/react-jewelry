import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    setItems: (state, action) => {
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
    minusItems(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem.count > 1) {
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
