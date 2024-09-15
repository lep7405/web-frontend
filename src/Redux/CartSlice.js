import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import axiosClient from "../helper/axiosHelper";
import { hideLoadingModal, showLoadingModal } from "../helper/modal.helper";

export const UpdateCartAction = createAsyncThunk(
  "cart/updateCart",
  async (params, { rejectWithValue }) => {
    try {
      console.log(params);
      const response = await axiosClient.post(
        `http://localhost:8090/cart/updateCartItem`,
        params
      );
      console.log(params);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);
export const DeleteCartAction = createAsyncThunk(
  "cart/deleteCart",
  async (params, { rejectWithValue }) => {
    try {
      console.log(params);
      const response = await axiosClient.delete(
        `http://localhost:8090/cart/deleteCartItem/${params.id}`
        
      );
      console.log(params);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const ClearCartAction = createAsyncThunk(
  "cart/clearCart",
  async (params, { rejectWithValue }) => {
    try {
      console.log(params);
      const response = await axiosClient.post(
        `http://localhost:8090/cart/clearCart`
        
      );
      console.log(params);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    getCart: (state, action) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UpdateCartAction.pending, (state) => {
        showLoadingModal();
      })
      .addCase(UpdateCartAction.fulfilled, (state, action) => {
        console.log(action.payload);
        let arr = state.cart.filter(
          (item) => item.id === action.payload.data.id
        );

        if (arr[0]) {
          // Find the index of the original item in the cart
          const index = state.cart.findIndex((item) => item.id === arr[0].id);

          // Update the quantity
          arr[0].quantity = action.payload.data.quantity;

          // Replace the original item in the cart with the updated one
          state.cart[index] = arr[0];
        } //thêm như này thì nó không dữ vị trí
        hideLoadingModal();
      })
      .addCase(UpdateCartAction.rejected, (state, action) => {
        console.log(action);
        toast.error(`🦄 ${action.payload}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        hideLoadingModal();
      })

      .addCase(DeleteCartAction.pending, (state) => {
        showLoadingModal();
      })
      .addCase(DeleteCartAction.fulfilled, (state, action) => {
        state.cart=state.cart.filter(item=>item.id!==action.payload.data.id)
        hideLoadingModal();
      })
      .addCase(DeleteCartAction.rejected, (state, action) => {
        console.log(action);
        toast.error(`🦄 ${action.payload}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        hideLoadingModal();
      })
      .addCase(ClearCartAction.pending, (state) => {
        showLoadingModal();
      })
      .addCase(ClearCartAction.fulfilled, (state, action) => {
        state.cart=[]
        hideLoadingModal();
      })
      .addCase(ClearCartAction.rejected, (state, action) => {
        console.log(action);
        toast.error(`🦄 ${action.payload}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        hideLoadingModal();
      });
  },
});
export const selectCart = (state) => state.cart.cart;
export const { getCart } = cartSlice.actions;
export default cartSlice.reducer;
