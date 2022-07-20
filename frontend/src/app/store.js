import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import preferenceReducer from '../features/preference/preferenceSlice'
import recommendationReducer from '../features/recommendation/recommendationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    globalStatePreference: preferenceReducer,
    recommendations: recommendationReducer
    },
})

export default store
