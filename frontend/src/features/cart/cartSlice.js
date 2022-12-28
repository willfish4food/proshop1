import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

const cartItemsFromStorage = JSON.parse(localStorage.getItem("cartItems"));

const initialState = {
  cartItems: cartItemsFromStorage ? cartItemsFromStorage : [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async ({ id, qty }, thunkAPI) => {
    try {
      return await cartService.addCartItem(id, qty);
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

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (id, thunkAPI) => {
    try {
      return await cartService.removeCartItem(id);
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
        const existingItem = state.cartItems.find(
          (x) => x.product === item.product
        );
        if (existingItem) {
          // If the item already exists, update its quantity by one
          state.cartItems = state.cartItems.map((x) =>
            x.product === item.product ? { ...x, qty: x.qty + item.qty } : x
          );
        } else {
          // If the item doesn't exist, add it to the cart with a quantity of one
          state.cartItems.push(item);
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cartItems = state.cartItems.filter(
          (x) => x.product !== action.payload
        );
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = cartSlice.actions;
export default cartSlice.reducer;
