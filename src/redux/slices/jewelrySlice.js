import { createSlice } from '@reduxjs/toolkit';

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
