import { configureStore } from '@reduxjs/toolkit';

import filterSlice from '../redux/slices/filterSlice';
import cartSlice from '../redux/slices/cartSlice';
import jewelrySlice from '../redux/slices/jewelrySlice';

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    jewelrySlice,
  },
});
