// this will be a subDocument relationship!
// this will NOT have a model for it

const mongoose = require('./connection')

const { Schema } = mongoose;

const entrySchema = new mongoose.Schema({
    instrument: String,
    piece: String,
    composer: String,
    minutes: Number,
    note: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId, // single User
        ref: 'User', // string value from the model creation
    }
}, {
    timestamps: true,
})

module.exports = entrySchema