const mongoose = require('mongoose')

const recommendationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'User'
    },
    restaurant_name: {
        type: String,
        required: true,
    },
    cuisine: {
        type: String,
        required: true,
    },
    price_range: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true,
    },
    long: {
        type: Number,
        required: true,
    },
    dish_key: {
        type: String,
        required: true,
    },
    dish_name: {
        type: String,
        required: true,
    },
    dish_description: {
        type: String,
        required: true,
    },
    tasteMatchCount: {
        type: Number,
        // enum: [0,1,2]// 1=hate, 2=like (willing to try again), 3=love, 
    },
    userFeelingType: {
        type: Number,
        // enum: [0,1,2]// 1=hate, 2=like (willing to try again), 3=love, 
    },
    review: {
        type: Number, 
        enum: [0,1,2]// 1=hate, 2=like (willing to try again), 3=love, 
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Recommendation', recommendationSchema)