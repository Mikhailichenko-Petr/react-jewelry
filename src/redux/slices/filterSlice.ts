
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
  RATING = 'rating',
  TITLE = 'title',
  PRICE = 'price',
}

export type SortType={
  name:string;
  type:SortPropertyEnum
}

export interface FilterSliceType{
  searchValue: string,
  category: number,
  page: number,
  sort: SortType,
}

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

// селектор для более удобного обращения к STATE
export const selectSort = (state:RootState) => state.filterSlice.sort;
export const selectFilter = (state:RootState) => state.filterSlice;

export const { setCategory, setSearchValue, setSort, setPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
