const mongoose = require('mongoose')

const restaurantSchema = mongoose.Schema({
    menu: {
        type: Object,
        required: [true, 'Please add a menu value']
    }
    // lat: {
    //     type: Decimal128,
    // },
    // long: {
    //     type: Decimal128,
    // }
}
)

module.exports = mongoose.model('Restaurants', restaurantSchema)