import { RootState } from "../store";

// селектор для более удобного обращения к STATE
export const selectSort = (state:RootState) => state.filterSlice.sort;
export const selectFilter = (state:RootState) => state.filterSlice;