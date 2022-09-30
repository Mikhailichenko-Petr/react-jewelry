import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 0,
  sort: {},
};

const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
