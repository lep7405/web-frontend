import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = true
    },
    logout: (state, action) => {
      state.isLogin = false
    }
  },
  extraReducers: builder => {
    
  }
})
export const selectIslogin= state => state.auth.isLogin
export const { login, logout } = authSlice.actions;
export default authSlice.reducer
