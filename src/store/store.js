import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./orderSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    order: orderSlice,
    product: productSlice,
    cart: cartSlice,
  },
});

export default store;
