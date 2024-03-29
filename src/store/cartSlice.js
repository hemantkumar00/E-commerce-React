import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartData: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    createCart: (state, action) => {
      state.cartData = action.payload.cartData;
    },
    removeCart: (state) => {
      state.cartData = null;
    },
  },
});

export const { createCart, removeCart } = cartSlice.actions;

export default cartSlice.reducer;
