import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import orderReducer from '../features/orders/orderSlice'
import preferenceReducer from '../features/preference/preferenceSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
    globalStatePreference: preferenceReducer,
  },
})

export default store
