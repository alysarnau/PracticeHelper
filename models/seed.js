/////////////////////////////////
// This file runs on `npm run seed`
/////////////////////////////////

/////////////////////////////////
// import dependencies
/////////////////////////////////
const mongoose = require('./connection')
const Practice = require('./practice')

/////////////////////////////////
// seed code
/////////////////////////////////
// save my db connection to a variable for easy reference later
const db = mongoose.connection

// this runs the callback function when the db connection is opened from this file
db.on('open', () => {
    // need array of starter fruits
    const startPractices = [
        // TODO: add seeded data!
        // { date: 1657640791, owner: "orange", entries: [''] },
        // { name: 1657640792, owner: "purple", entries: [''] },
        // { name: 1657640793, owner: "orange", entries: [''] },
        // { name: 1657640794, owner: "red", entries: [''] },
        // { name: 1657640795, owner: "brown", entries: [''] },
    ]
    // when we seed data, we usually clear out the db first
    // then create that data 
    // whether successful OR not, we want to close our db connection
    Practice.deleteMany({})
    // then we create the data
    .then(deletedPractices => {
        console.log('this is what remove returns', deletedPractices)
        Practice.create(startPractices)
        .then(data => {
            console.log('the new practices ', data)
            db.close()
        })
        .catch(err => {
            console.log('error:', err)
            db.close()
        })
    })
    // and return error if failed
    .catch(err => {
        console.log('error:', err)
        db.close()
    })
})