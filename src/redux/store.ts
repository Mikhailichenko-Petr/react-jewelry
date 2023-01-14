import { useDispatch } from 'react-redux';
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

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const dispatchUp =()=> useDispatch<AppDispatch>()