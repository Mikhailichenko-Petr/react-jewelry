import { FilterSliceType, SortPropertyEnum, SortType } from './types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';



const initialState:FilterSliceType = {
  searchValue: '',
  category: 0,
  page: 1,
  sort: { name: 'популярности', type: SortPropertyEnum.RATING },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action:PayloadAction<number>) => {
      state.category = action.payload;
    },
    setSearchValue: (state, action:PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSort: (state, action:PayloadAction<SortType>) => {
      state.sort = action.payload;
    },
    setPage: (state, action:PayloadAction<number>) => {
      state.page = action.payload;
    },
    setFilters: (state, action:PayloadAction<FilterSliceType>) => {
       if (Object.keys(action.payload).length) {
        state.page = action.payload.page;
        state.category = action.payload.category;
        state.sort = action.payload.sort;
      } else {
        state.page = 1;
        state.category = 0;
        state.sort = {
          name: 'популярности',
          type: SortPropertyEnum.RATING,
        };
      }
    }, 
  },
});



export const { setCategory, setSearchValue, setSort, setPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
