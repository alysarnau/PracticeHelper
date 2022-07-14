const { response } = require('express')
const express = require('express')
const moment = require('moment')
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
    const user = req.session.username
    const loggedIn = req.session.loggedIn
    // query
    const practiceID = req.params.id;
    Practice.findById(practiceID)
        .then(practice => {
            res.render('practices/edit.liquid', { practice, user, loggedIn })
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
    req.body.owner = req.session.userId
        Practice.create(req.body)
        .then(practice => {
            console.log(practice)
            res.redirect('/practices')
        })
        .catch(err => {
            res.json(err)
        })
})

////////////////////////////////
// GET - index action
////////////////////////////////
router.get('/', (req, res) => {
    const user = req.session.username
    const loggedIn = req.session.loggedIn
    Practice.find({})
        .then(practices => {
            // convert date for each item to date
            practices.forEach((practice) => {
                practice.date = new Date(practice.date)
                practice.date = moment(practice.date).format('MMMM DD');
            })
            // sort practices chronologically
            practices.sort(function(a,b){
                return new Date(b.date) - new Date(a.date);
            })
            res.render('practices/index', {  practices, user, loggedIn  })
        })
        .catch(err => {
            res.json(err);
        })
})

////////////////////////////////
// GET - Show - gets a specific practice and shows it to you
////////////////////////////////
router.get('/mine', (req,res) => {
    const user = req.session.username
    const loggedIn = req.session.loggedIn
    Practice.find({ owner: req.session.userId })
        .then(practices => {
            res.render('practices/index', { practices, user, loggedIn })
        })
        .catch(err => {
            console.log(err)
            res.json({ err })
        })
})

////////////////////////////////
// GET - Show - gets a specific doc and shows it to you
////////////////////////////////
router.get('/:id', (req,res) => {
    const practiceID = req.params.id;
    Practice.findById(practiceID)
        .populate('entries.author')
        .then(practice => {
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