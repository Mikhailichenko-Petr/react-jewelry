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
      console.log(findItem);
      if (findItem) {
        console.log(findItem);
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
    clearItems: (state, action) => {
      state.items = state.items.filter((obj) => obj.id === action.payload);
    },
    removeItems: (state) => {
      state.items = [];
    },
  },
});

export const { setItems, clearItems, removeItems } = cartSlice.actions;

export default cartSlice.reducer;
