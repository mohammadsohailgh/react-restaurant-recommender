const mongoose = require('mongoose')

const foodTagsSchema = mongoose.Schema({
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
}
)

module.exports = mongoose.model('Orders', orderSchema)