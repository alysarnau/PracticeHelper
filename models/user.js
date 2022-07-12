/////////////////////////////////
// first: import dependencies
/////////////////////////////////
const mongoose = require('./connection')


/////////////////////////////////
// define our user model
/////////////////////////////////
const { Schema, model } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

// make a user model with the userSchema

const User = model('User', userSchema)

/////////////////////////////////
// export our user model
/////////////////////////////////
module.exports = User