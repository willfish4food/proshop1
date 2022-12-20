import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";
import axios from "axios";

const initialState = {
  cartItems: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async (id, qty, thunkAPI) => {
    try {
      const cartItem = await cartService.addCartItem(id, qty);
      localStorage.setItem("cartItems", JSON.stringify(cartItem));
      return cartItem;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: (state) => {
      state.cartItems = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const item = action.payload;
        const existItem = state.cartItems.find(
          (x) => x.product === item.product
        );
        if (existItem) {
          state.cartItems = state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          );
        } else {
          state.cartItems.push(item);
        }
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = cartSlice.actions;
export default cartSlice.reducer;
