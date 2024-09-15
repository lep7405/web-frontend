import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import axiosClient from "../helper/axiosHelper";
import { hideLoadingModal, showLoadingModal } from "../helper/modal.helper";

export const addAddressAction = createAsyncThunk(
  "address/addAddress",
  async (params, { rejectWithValue }) => {
    try {
      console.log(params);
      const response = await axiosClient.post(
        `http://localhost:8090/address/addAddress`,
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
export const setAddressDefaultAction = createAsyncThunk(
  "address/setAddressDefault",
  async (params, { rejectWithValue }) => {
    try {
      console.log(params);
      const response = await axiosClient.post(
        `http://localhost:8090/address/setAddressDefault/${params.id}`
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

export const updateAddressAction = createAsyncThunk(
  "address/updateAddress",
  async (params, { rejectWithValue }) => {
    try {
      console.log(params);
      const response = await axiosClient.put(
        `http://localhost:8090/address/updateAddress `,
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
const AddressSlice = createSlice({
  name: "address",
  initialState: {
    addressList: [],
    addressDefault: {},
  },
  reducers: {
    getAddressList: (state, action) => {
      state.addressList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAddressAction.pending, (state) => {
        showLoadingModal();
      })
      .addCase(addAddressAction.fulfilled, (state, action) => {
        state.addressList.push(action.payload.data.address);
        hideLoadingModal();
      })
      .addCase(addAddressAction.rejected, (state, action) => {
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
      .addCase(setAddressDefaultAction.pending, (state) => {
        showLoadingModal();
      })
      .addCase(setAddressDefaultAction.fulfilled, (state, action) => {
        let arr = state.addressList.filter(
          (item) => item.id === action.payload.data.address.id
        );

        if (arr[0]) {
          // Find the index of the original item in the cart
          const index = state.addressList.findIndex(
            (item) => item.id === arr[0].id
          );
          state.addressList.map((item) => (item.isDefault = false));
          // Update the quantity
          arr[0].isDefault = action.payload.data.address.isDefault;

          // Replace the original item in the cart with the updated one
          state.addressList[index] = arr[0];
        } //thêm như này thì nó không dữ vị trí
        hideLoadingModal();
      })
      .addCase(setAddressDefaultAction.rejected, (state, action) => {
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
      .addCase(updateAddressAction.pending, (state) => {
        showLoadingModal();
      })
      .addCase(updateAddressAction.fulfilled, (state, action) => {
        let arr = state.addressList.filter(
          (item) => item.id === action.payload.data.address.id
        );

        if (arr[0]) {
          // Find the index of the original item in the cart
          const index = state.addressList.findIndex(
            (item) => item.id === arr[0].id
          );

          // Update the quantity
          arr[0] = action.payload.data.address;

          // Replace the original item in the cart with the updated one
          state.addressList[index] = arr[0];
        } //thêm như này thì nó không dữ vị trí
        hideLoadingModal();
      })
      .addCase(updateAddressAction.rejected, (state, action) => {
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
export const selectAddressDefault = (state) => state.address.addressDefault;
export const selectAddressList = (state) => state.address.addressList;
export const { getAddressList } = AddressSlice.actions;
export default AddressSlice.reducer;
