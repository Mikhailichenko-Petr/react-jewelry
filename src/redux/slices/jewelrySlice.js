import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchJewelry = createAsyncThunk('jewelry/fetchJeweleryStatus', async () => {
  const res = await axios.get(
    `https://632e4bcbf9b533cc58ee4523.mockapi.io/items/?page=${page}&limit=8&sortBy=${
      sort.type
    }&order='asc'${searchValue ? `?&search=${searchValue}` : ''}&${
      category > 0 ? `category=${category}` : ''
    }`,
  );
  return res;
});

const initialState = {
  items: [],
};

const jewelrySlice = createSlice({
  name: 'Jewelry',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const { setItems } = jewelrySlice.actions;

export default jewelrySlice.reducer;
