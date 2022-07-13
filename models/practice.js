// using an already connected mongoose, not a fresh one from node modules
const mongoose = require('./connection');
const entrySchema = require('./entry')

// need to get Schema + model
// deconstructure syntax - need an object to deconstruct
// inside of Mongoose, I want the keys that are named Schema and model
const { Schema, model } = mongoose;


// for sub doc relationships, we set up the relationship on the RECEIVING end (ie. fruit in this case)
const practiceSchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,        
        // a single User ._id field
        ref: 'User', 
        // refers to const User = model('User', userSchema)
        // the string of 'User' is how we reference a model
    },
    instrument: String,
    entries: [entrySchema], //a practice can have many entries
}, {
    timestamps: true,
})

// need to make a model
// this collection will be called fruits
const Practice = model('Practice', practiceSchema)

module.exports = Practice

// started my server
    // .env with port number
    // npm start
// connection.js
    // mongoose to hook up
// mongoDB
    // db_uri
// fruits.js
    // using mongoose to create a schema
    // use that schema to create a model