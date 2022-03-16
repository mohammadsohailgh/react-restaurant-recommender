const mongoose = require('mongoose') //ODM to interact with mongo DB, and also used to create schemas and models

const userSchema = mongoose.Schema({
    name: { 
        type: String,
        required: [true, 'Please add a name']
    },
    email: { 
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: { 
        type: String,
        required: [true, 'Please add a password']
    },
    role: { 
        type: String, //false = restaurant user, true = customer
        required: [true, 'Please add a role'],
        enum: ["customer", "restaurant"]
    }, 
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)