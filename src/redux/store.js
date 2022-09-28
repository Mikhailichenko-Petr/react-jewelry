import { configureStore } from '@reduxjs/toolkit';

import filterSlice from '../redux/slices/filterSlice';

export const store = configureStore({
  reducer: {
    filterSlice,
  },
});
