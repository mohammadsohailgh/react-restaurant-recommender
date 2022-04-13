import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderService from './orderService'

const initialState = {
    orders: [],
    //every redux resource will have isError, isSuccess, isLoading, message
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// create new order
export const createOrder = createAsyncThunk(
    'orders/create', 
    async (orderData, thunkAPI) => {
    try {
        console.log("orderSlice hit!")
        console.log(orderData)
        const token = thunkAPI.getState().auth.user.token
        return await orderService.createOrder(orderData, token)
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


// get user orders
export const getOrders = createAsyncThunk('orders/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await orderService.getOrders(token)
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


export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        // reset: (state) => initialState
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.orders.push(action.payload)
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.orders = action.payload
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})


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

export const { reset } = orderSlice.actions
export default orderSlice.reducer