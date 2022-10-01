import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 0,
  page: 1,
  sort: { name: 'популярности', type: 'rating' },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setCategory, setSort, setPage } = filterSlice.actions;

export default filterSlice.reducer;
