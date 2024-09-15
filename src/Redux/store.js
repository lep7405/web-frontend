import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './AuthSlice'
import CartReducer from './CartSlice'
import AddressReducer from "./AddressSlice"
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    cart:CartReducer,
    address:AddressReducer
  }
})
