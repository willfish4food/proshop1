import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import productReducer from "../features/products/productSlice";
//import orderReducer from "../features/orders/orderSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
  },
});
