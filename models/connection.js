// connects mongoDB to mongoose!

// requiring dotenv package so we can get things out of our .env file
require('dotenv').config();
const mongoose = require('mongoose');

const DATABASE_URI = process.env.DATABASE_URI

const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

// connecting our mongoDB to mongoose
mongoose.connect(DATABASE_URI, config)

// we want to open up connection, handle closing connection, and handle any errors we encounter

mongoose.connection
// handle the opening of the connection
// it runs a code block on open
// console.logging a string
    .on('open', () => console.log('Connected to Mongoose'))
    // since we have opened a connecction, we've gotta close it.
    // still running a code block, but this time on close.
    .on('close', () => console.log('Disconnected from Mongoose'))
    // handling errors that may happen
    // running a code block on error
    // using console.error to see that error
    .on('error', err => console.error(err))

module.exports = mongoose