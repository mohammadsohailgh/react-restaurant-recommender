import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import orderReducer from '../features/orders/orderSlice'
import preferenceReducer from '../features/preference/preferenceSlice'
import recommendationReducer from '../features/recommendation/recommendationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
    globalStatePreference: preferenceReducer,
    recommendations: recommendationReducer,
  },
})

export default store
