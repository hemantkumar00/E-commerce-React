import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    createProduct: (state, action) => {
      state.productData = action.payload.productData;
    },
    removeProduct: (state) => {
      state.productData = null;
    },
  },
});

export const { createProduct, removeProduct } = productSlice.actions;

export default productSlice.reducer;
