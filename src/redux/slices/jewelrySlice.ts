import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { type } from 'os';
import { RootState } from '../store';
import { SortType } from './filterSlice';

export type FethDataType = {
  category:number, page:number, sort:SortType, searchValue:string
}

type JewelryType={
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  raiting: number
  types: number[];
  sizes: number[];
}

enum Status{
  LOADING='loading',
  SUCCES='succes',
  ERROR='error',
}

interface JewelrySliceType{
  items: JewelryType[];
  status: Status
}

export const fetchJewelry = createAsyncThunk<JewelryType[],FethDataType>(
  'jewelry/fetchJeweleryStatus',
  async (params) => {
    const { category, page, sort, searchValue } = params
    const {type} = sort
    const res = await axios.get<JewelryType[]>(
      `https://632e4bcbf9b533cc58ee4523.mockapi.io/items/?page=${page}&limit=8&sortBy=${
        type
      }&order='asc'${searchValue ? `?&search=${searchValue}` : ''}&${
        category > 0 ? `category=${category}` : ''
      }`,
    );
    return res.data;
  },
);



const initialState:JewelrySliceType = {
  items: [],
  status: Status.LOADING
};

const jewelrySlice = createSlice({
  name: 'Jewelry',
  initialState,
  reducers: {
    setItems(state, action:PayloadAction<JewelryType[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJewelry.pending, (state) => {
      state.status = Status.LOADING
      state.items = [];
    })
    builder.addCase(fetchJewelry.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCES
    })
    builder.addCase(fetchJewelry.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR
    })
  },
});

// селектор для более удобного обращения к STATE
export const selectSlice = (state:RootState) => state.jewelrySlice;

export const { setItems } = jewelrySlice.actions;

export default jewelrySlice.reducer;
