import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import productReducer from "../features/products/productSlice";
//import orderReducer from "../features/orders/orderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
  },
});

export default store;
