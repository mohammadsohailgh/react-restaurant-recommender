import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import preferenceService from './preferenceService.js'

const initialState = {
    globalStatePreference: null,
    //every redux resource will have isError, isSuccess, isLoading, message
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// create new Preference
export const setPreference = createAsyncThunk(
    'preference/set', 
    async (preferenceData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const userId = thunkAPI.getState().auth.user._id
        console.log('preferenceData:',preferenceData)
        return await preferenceService.updatePreference(preferenceData, userId,  token)
    } catch (error) {
        const message =
            (
            error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get user Preference
export const getPreference = createAsyncThunk('preference/get', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await preferenceService.getPreference(token)
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const preferenceSlice = createSlice({
    name: 'preference',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(setPreference.pending, (state) => {
                state.isLoading = true
            })
            .addCase(setPreference.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                console.log('action payload preferenceSlice', action.payload)
                state.globalStatePreference = action.payload.preference
            })
            .addCase(setPreference.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getPreference.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPreference.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.globalStatePreference = action.payload.preference
            })
            .addCase(getPreference.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})


export const { reset } = preferenceSlice.actions
export default preferenceSlice.reducer