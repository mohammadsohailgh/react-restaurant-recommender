// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
// import orderService from './orderService'
// const initialState = {
//     orders: [],
//     isError: false,
//     isSuccess: false,
//     isLoading: false,
//     message: ''
// }

// export const orderSlice = createSlice ({
//     name: 'order',
//     initialState ,
//     reducers: {
//         reset: (state) => initialState
//     },
//     extraReducers: (builder) => {
//         builder
//         .addCase(getOrders.pending, (state) => {
//             state.isLoading = true
//         })
//         .addCase(getOrders.fulfilled, (state, action) => {
//             state.isLoading = false
//             state.isSuccess = true
//             state.orders = action.payload
//         })
//         .addCase(getOrders.rejected, (state, action) => {
//             state.isLoading = false
//             state.isSuccess = true
//             state.orders = action.payload
//         })
//     }
// })


// // Get user orders
// export const getOrders = createAsyncThunk('orders/getAll', async (_, thunkAPI) => {
//     try {
//         const token = thunkAPI.getState().auth.user.token
//         return await orderService.getOrders(token)
//     } catch (error) {
//         const message =
//         (error.response && error.response.data && error.response.data.message) ||
//             error.message ||
//             error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })

// export const {reset} = orderSlice.actions
// export default orderSlice.reducer