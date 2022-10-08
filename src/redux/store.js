import { configureStore } from '@reduxjs/toolkit';

import filterSlice from '../redux/slices/filterSlice';
import cartSlice from '../redux/slices/cartSlice';
export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
  },
});
