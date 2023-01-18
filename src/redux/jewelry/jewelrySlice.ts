import { fetchJewelry } from './asyncAction';
import { JewelrySliceType, JewelryType, Status } from './types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';



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



export const { setItems } = jewelrySlice.actions;

export default jewelrySlice.reducer;
