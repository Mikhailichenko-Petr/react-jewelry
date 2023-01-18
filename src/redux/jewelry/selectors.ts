import { RootState } from "../store";


// селектор для более удобного обращения к STATE
export const selectSlice = (state:RootState) => state.jewelrySlice;