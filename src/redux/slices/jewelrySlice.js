import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchJewelry = createAsyncThunk(
  'jewelry/fetchJeweleryStatus',
  async ({ category, page, sort, searchValue }) => {
    const res = await axios.get(
      `https://632e4bcbf9b533cc58ee4523.mockapi.io/items/?page=${page}&limit=8&sortBy=${
        sort.type
      }&order='asc'${searchValue ? `?&search=${searchValue}` : ''}&${
        category > 0 ? `category=${category}` : ''
      }`,
    );
    return res.data;
  },
);

const initialState = {
  items: [],
  status: 'loading',
};

const jewelrySlice = createSlice({
  name: 'Jewelry',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchJewelry.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchJewelry.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchJewelry.rejected]: (state, action) => {
      state.items = [];
      state.status = 'error';
    },
  },
});

export const { setItems } = jewelrySlice.actions;

export default jewelrySlice.reducer;
