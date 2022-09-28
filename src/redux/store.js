import { configureStore } from '@reduxjs/toolkit';

import counterReducer from '../redux/slices/filterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
