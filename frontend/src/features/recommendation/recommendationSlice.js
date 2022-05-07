import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import recommendationService from './recommendationService'

const initialState = {
    recommendations: [],
    //every redux resource will have isError, isSuccess, isLoading, message
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// create new recommendation
export const createRecommendation = createAsyncThunk(
    'recommendations/create', 
    async (recommendationData, thunkAPI) => {
    try {
        console.log("recommendationSlice hit!")
        console.log(recommendationData)
        const token = thunkAPI.getState().auth.user.token
        return await recommendationService.createRecommendation(recommendationData, token)
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


// get user recommendations
export const getRecommendations = createAsyncThunk('recommendations/getAll', async (_, thunkAPI) => {
    try {
        console.log('getRecommendations ordersSlice hit!: ')

        const token = thunkAPI.getState().auth.user.token
        return await recommendationService.getRecommendations(token)
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


// get user recommendations
export const updateRecommendation = createAsyncThunk('recommendations/update', async (reviewData, thunkAPI) => {
    try {

        const token = thunkAPI.getState().auth.user.token
        const userId = thunkAPI.getState().auth.user._id
        return await recommendationService.updateRecommendation(reviewData,  token)
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



export const recommendationSlice = createSlice({
    name: 'recommendation',
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
            .addCase(createRecommendation.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createRecommendation.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true  
                console.log(action.payload)
                if(action.payload === "204") {
                    console.log("CHANGED!!!!!")
                    state.message = "No food dishes were found with your current selected preferences"
                } else {
                    state.message = ''
                    state.recommendations.push(action.payload)
                }
            })
            .addCase(createRecommendation.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getRecommendations.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getRecommendations.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                console.log('get recommendations action.payload: ', action.payload)
                state.recommendations = action.payload.reverse()
            })
            .addCase(getRecommendations.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateRecommendation.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateRecommendation.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                console.log('update recommendations action.payload: ', action.payload)
                // state.recommendations.push(action.payload)
                // state.recommendations.forEach(e => {
                //     // console.log(e._id)
                //     if (e._id === action.payload._id) {
                //         e = action.payload
                //     }
                // });

                // state.recommendations.find(recommendation => recommendation._id === action.payload._id).mark = "marked!"
                
                const index = state.recommendations.findIndex(x => x._id === action.payload._id)
                state.recommendations[index] = action.payload

            })
            .addCase(updateRecommendation.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})


export const { reset } = recommendationSlice.actions
export default recommendationSlice.reducer