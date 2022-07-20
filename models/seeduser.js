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
const db = mongoose.connection
db.on('open', () => {
    // need array of starter practices
    const startUser = [
        {
            _id: ObjectId("62d6f1ec4ca402f571bedeb0"),
            name: 'alysvolatile',
            password: '$2a$10$4wUbCm1wN/MH9LBKLCcu1ezDS2aO4wMwkxkwctqFucILcP.5Dd.vG',
            favoriteComposers: [
                'Carl Philipp Emanuel Bach',
                'Johann Sebastian Bach',
                'Philip Glass',
                'Giuseppe Tartini'
            ],
            favoritePieces: [],
            favoriteGenres: [],
            __v: 0
        }
        
]
    
    // when we seed data, we usually clear out the db first
    // then create that data 
    // whether successful OR not, we want to close our db connection
    User.deleteMany({})
    // then we create the data
    .then(deletedUsers => {
        console.log('this is what remove returns', deletedUsers)
        User.create(startUser)
        .then(data => {
            console.log('the new Users ', data)
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