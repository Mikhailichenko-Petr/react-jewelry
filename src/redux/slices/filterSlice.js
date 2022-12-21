import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  category: 0,
  page: 1,
  sort: { name: 'популярности', type: 'rating' },
  filters: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload.page;
      state.category = action.payload.category;
      state.sort = action.payload.sort;
    }, //// не используется
  },
});

// селектор для более удобного обращения к STATE
export const selectSort = (state) => state.filterSlice.sort;
export const selectFilter = (state) => state.filterSlice;

export const { setCategory, setSearchValue, setSort, setPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
