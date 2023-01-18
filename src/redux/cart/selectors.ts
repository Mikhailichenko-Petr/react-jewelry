import { RootState } from "../store";

// селектор для более удобного обращения к STATE
export const selectCart = (state:RootState) => state.cartSlice;
export const selectCartSlice = (id:string) => (state:RootState) =>
  state.cartSlice.items.find((obj) => obj.id === id);