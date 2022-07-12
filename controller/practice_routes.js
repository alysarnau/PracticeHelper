const { response } = require('express')
const express = require('express')
// making a router
const router = express.Router()
// importing Fruit model to access DB
const Practice = require('../models/practice')

// // DELETE - Delete a fruit
// router.delete('/:id', (req,res) => {
//     const fruitID = req.params.id;
//     Fruit.findByIdAndRemove(fruitID)
//         .then(fruit => {
//             res.redirect('/fruits')
//         })
//         .catch(err => {
//             res.json(err)
//         })
// })

// // get route for displaying an update form
// router.get('/:id/edit', (req,res) => {
//     // query
//     const fruitID = req.params.id;
//     Fruit.findById(fruitID)
//         .then(fruit => {
//             res.render('fruits/edit', { fruit })
//         })
//         .catch(err => {
//             res.json(err)
//         })
// })

// // PUT - Update the fruit details
// router.put('/:id', (req, res) => {
//     const fruitID = req.params.id;
//     req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;
//     Fruit.findByIdAndUpdate(fruitID, req.body, { new: true})
//     // we need the new: true since we're using a PUT method
//         .then(fruit => {
//             res.redirect(`/fruits/${fruit._id}`)
//         })
//         .catch(err => {
//             res.json(err)
//         })
// })


// // GET route for displaying my form for create
// router.get('/new', (req, res) => {
//     const username = req.session.username;
//     const loggedIn = req.session.loggedIn;
//     res.render('fruits/new', {username, loggedIn})
// })

// //POST (create) action
// router.post('/', (req,res) => {
//     req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;

//     // now that we have user specific routes, we'll add a username upon creation
//     // remember, when we login, we saved the username to the session object

//     // using the ._id to set the owner field
//     req.body.owner = req.session.userId
    
//     Fruit.create(req.body)
//         .then(fruit => {
//             console.log(fruit)
//             //res.json(fruit)
//             res.redirect('/fruits')
//         })
//         .catch(err => {
//             res.json(err)
//         })
// })



// GET - index action
// localhost:3000/practices
router.get('/', (req, res) => {
    // mongoose to find all practices
    Practice.find({})
        .then(practices => {
            // return practices as json
            // res.json(practices);
            res.render('practices/index', { practices })
        })
        .catch(err => {
            res.json(err);
        })
})

// router.get('/mine', (req,res) => {
//     // find the fruits associated with the logged in user
//     // using the ._id to set the owner field
//     Fruit.find({ owner: req.session.userId })
//         .then(fruits => {
//             res.render('fruits/index', { fruits })
//         })
//         .catch(err => {
//             console.log(err)
//             res.json({ err })
//         })
// })

// // GET - Show - gets a specific doc and shows it to you
// // localhost:3000/fruits/:id <- this value changes with id being passed in
// router.get('/:id', (req,res) => {
//     // whatever you named your param on line above, is how you need to refer to it on line below (:id === req.params.id)
//     const fruitID = req.params.id;
//     Fruit.findById(fruitID)
//     // populate our User models fields
//     // comment has an author field and that is the ref to the User model
//     // always going to be a string of the value you want to populate
//     // this also has to be another model
//         .populate('comments.author')
//     // send back some json
//         .then(fruit => {
//             //res.json(fruit)
//             const userId = req.session.userId
//             const username = req.session.username
//             res.render('fruits/show', { fruit, userId, username })
//         })
//         .catch(err => {
//             res.json(err)
//         })
// })




module.exports = router