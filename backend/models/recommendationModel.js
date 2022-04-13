const mongoose = require('mongoose')

const recommendationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    recommendation: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Recommendation' 
    },
    review: {
        type: Number, 
        enum: [1,2,3]//1=love, 2=like (willing to try again), 3=hate
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Recommendation', recommendationSchema)