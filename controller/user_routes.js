///////////////////////////////////////
// Import dependencies
///////////////////////////////////////
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const Practice = require('../models/practice')
const Entry = require('../models/practice')
const moment = require('moment')

///////////////////////////////////////
// Create a router
///////////////////////////////////////
const router = express.Router()

///////////////////////////////////////
// List Routes
///////////////////////////////////////
// GET - SIGNUP

// TODO: if user is logged in, redirect to practices
router.get('/home', (req, res) => {
    const session = req.session
    res.render('users/home', { session })
})

// GET - SIGNUP
router.get('/signup', (req, res) => {
    res.render('users/signup')
})

// POST - DB REQUEST
router.post('/signup', async (req, res) => {
    console.log('this is our initial request body', req.body)
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )
    console.log('this is request body after hashing', req.body)
    User.create(req.body)
        .then(user => {
            console.log('this is the new user', user)
            res.redirect('/users/login')
        })
        .catch(error => {
            console.log(error)
            res.json(error)
        })
})

// GET - LOGIN
router.get('/login', (req, res) => {
        res.render('users/login')
})


// POST - LOGIN, CREATE SESSION
router.post('/login', async (req, res) => {
    const { name, password } = req.body
    console.log('this is the session', req.session)
    User.findOne({ name })
        .then(async (user) => { 
            if (user) {
                const result = await bcrypt.compare(password, user.password)
                if (result) {
                    req.session.username = name;
                    req.session.loggedIn = true;
                    req.session.userId = user._id;
                    console.log('this is the session after login', req.session);
                    res.redirect('/practices/mine')
                } else {
                    // TODO: otherwise(pw incorrect) send to error page
                    res.json({ error: 'username or password incorrect' });
                }
            } else {
                res.json({ error: 'user does not exist' })
            }
        })
        .catch(error => {
            console.log(error)
            res.json(error)
        })
})

// GET - LOGOUT
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        console.log('this is the error in logout', err)
        console.log('session has been destroyed')
        console.log(req.session)
        res.redirect('/users/home')
    })
})

// GET - Reporting
router.get('/report', (req,res) => {
    const user = req.session.username
    const loggedIn = req.session.loggedIn
    let totalMinutes = 0;
    Practice.find({ })
        .then(practices => {
            res.render('users/report', { practices, user, loggedIn, totalMinutes })
        })
        .catch(err => {
            console.log(err)
            res.json({ err })
        })
})

// GET - Reporting MINE
router.get('/report/mine', (req,res) => {
    const user = req.session.username
    const loggedIn = req.session.loggedIn
    let totalMinutes = 0;
    // for search capability
    let startDate;
    let endDate;
    //
    Practice.find({ owner: req.session.userId })
        .then(practices => {
            // convert date for each item to date
            practices.forEach((practice) => {
                practice.date = new Date(practice.date)
                practice.date = moment(practice.date).format('MMMM DD');
            })
            // sort practices chronologically
            practices.sort(function(a,b){
                return new Date(a.date) - new Date(b.date);
            })
            ///
            res.render('users/report', { practices, user, loggedIn, totalMinutes })
        })
        .catch(err => {
            console.log(err)
            res.json({ err })
        })
})

////////////////////////////////
// GET - Show - gets reporting search input and shows it to you
////////////////////////////////
// TODO: change
// BASIC FUNCTIONALITY WORKS! now just need to hook it up to date range
router.get('/report/mine/range', (req,res) => {
    //
    let totalMinutes = 0;
    //
    let startDate = "2022-07-05";
    let endDate = "2022-07-16";
    //
    const user = req.session.username
    const loggedIn = req.session.loggedIn
    Practice.find({ date:{$gte:(startDate),$lt:(endDate)} })
    // to edit
        .then(practices => {
            console.log(practices)
            // we want to check each practice's entries
            // and for each entry in entries, we want to see if the composer = search query
            // if it does, we want to return that entry
            res.render('users/report', { practices, user, loggedIn, totalMinutes })
            }
        )
        .catch(err => {
            console.log(err)
            res.json({ err })
        })
})

///////////////////////////////////////
// export our router
///////////////////////////////////////
module.exports = router