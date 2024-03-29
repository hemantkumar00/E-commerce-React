import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderData: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrder: (state, action) => {
      state.orderData = action.payload.orderData;
    },
    removeOrder: (state) => {
      state.orderData = null;
    },
  },
});

export const { createOrder, removeOrder } = orderSlice.actions;

export default orderSlice.reducer;
