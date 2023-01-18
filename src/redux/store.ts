import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import filterSlice from './filter/filterSlice';
import cartSlice from './cart/cartSlice';
import jewelrySlice from './jewelry/jewelrySlice';

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    jewelrySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const DispatchUp =()=> useDispatch<AppDispatch>()