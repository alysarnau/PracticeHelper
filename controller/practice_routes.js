const { response } = require('express')
const express = require('express')
const router = express.Router()
const Practice = require('../models/practice')

////////////////////////////////
// DELETE - Delete a practice
////////////////////////////////
router.delete('/:id', (req,res) => {
    const practiceID = req.params.id;
    Practice.findByIdAndRemove(practiceID)
        .then(practice => {
            res.redirect('/practices')
        })
        .catch(err => {
            res.json(err)
        })
})

////////////////////////////////
// GET - display an update form
////////////////////////////////
router.get('/:id/edit', (req,res) => {
    // query
    const practiceID = req.params.id;
    Practice.findById(practiceID)
        .then(practice => {
            res.render('practices/edit.liquid', { practice })
        })
        .catch(err => {
            res.json(err)
        })
})

////////////////////////////////
// PUT - Update the practice details
////////////////////////////////
router.put('/:id', (req, res) => {
    const practiceID = req.params.id;
    Practice.findByIdAndUpdate(practiceID, req.body, { new: true })
    // we need the new: true since we're using a PUT method
        .then(practice => {
            res.redirect(`/practices/${practice._id}`)
        })
        .catch(err => {
            res.json(err)
        })
})

////////////////////////////////
// GET route for displaying form for create
////////////////////////////////
router.get('/new', (req, res) => {
    const username = req.session.username;
    const loggedIn = req.session.loggedIn;
    res.render('practices/new', {username, loggedIn})
})

////////////////////////////////
// //POST (create) action
////////////////////////////////
router.post('/', (req,res) => {
    // now that we have user specific routes, we'll add a username upon creation
    // remember, when we login, we saved the username to the session object

    // using the ._id to set the owner field
    req.body.owner = req.session.userId
    
    Practice.create(req.body)
        .then(practice => {
            console.log(practice)
            //res.json(fruit)
            res.redirect('/practices')
        })
        .catch(err => {
            res.json(err)
        })
})

////////////////////////////////
// GET - index action
////////////////////////////////
// localhost:3000/practices
router.get('/', (req, res) => {
    Practice.find({})
        .then(practices => {
            res.render('practices/index', { practices })
        })
        .catch(err => {
            res.json(err);
        })
})

////////////////////////////////
// GET - Show - gets a specific practice and shows it to you
////////////////////////////////
router.get('/mine', (req,res) => {
    // find the practices associated with the logged in user
    // using the ._id to set the owner field
    Practice.find({ owner: req.session.userId })
        .then(practices => {
            res.render('practices/index', { practices })
        })
        .catch(err => {
            console.log(err)
            res.json({ err })
        })
})

////////////////////////////////
// GET - Show - gets a specific doc and shows it to you
////////////////////////////////
// localhost:3000/practices/:id
router.get('/:id', (req,res) => {
    // whatever you named your param on line above, is how you need to refer to it on line below (:id === req.params.id)
    const practiceID = req.params.id;
    Practice.findById(practiceID)
    // populate our User models fields
    // entry has an author field and that is the ref to the User model
    // always going to be a string of the value you want to populate
    // this also has to be another model
        .populate('entries.author')
    // send back some json
        .then(practice => {
            // res.json(practice)
            const userId = req.session.userId
            const username = req.session.username
            res.render('practices/show', { practice, userId, username })
        })
        .catch(err => {
            res.json(err)
        })
})

////////////////////////////////
// Export router
////////////////////////////////
module.exports = router