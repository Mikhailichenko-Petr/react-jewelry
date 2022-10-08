import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    clearItems: (state, action) => {
      state.items.filter();
    },
    removeItems: (state) => {
      state.items = [];
    },
  },
});

export const { setItems, clearItems, removeItems } = cartSlice.actions;

export default cartSlice.reducer;
