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
const url = require('url')

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
    let instrumentArray = []
    let uniqueInstruments = []
    Practice.find({ owner: req.session.userId })
        .then(practices => {
            // convert date for each item to date
            practices.forEach((practice) => {
                practice.date = new Date(practice.date)
                practice.date = moment(practice.date).format('MMMM DD');
                instrumentArray.push(practice.instrument)
            })
            // sort practices chronologically
            practices.sort(function(a,b){
                return new Date(a.date) - new Date(b.date);
            })
            uniqueInstruments = [...new Set(instrumentArray)]
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
router.get('/report/mine/range', (req,res) => {
    let totalMinutes = 0;
    const queryObject = url.parse(req.url,true).query
    let startDate = queryObject.startDate;
    let endDate = queryObject.endDate;
    let composer = queryObject.composer;
    let piece = queryObject.piece;
    let instrument = queryObject.instrument;
    const user = req.session.username
    const loggedIn = req.session.loggedIn
    let instrumentArray = []
    let uniqueInstruments = []
    Practice.find({ date:{$gte:(startDate),$lt:(endDate)} })
        .then(practices => {
                        // convert date for each item to date
                        practices.forEach((practice) => {
                            practice.date = new Date(practice.date)
                            practice.date = moment(practice.date).format('MMMM DD');
                            instrumentArray.push(practice.instrument)
                        })
                        // sort practices chronologically
                        practices.sort(function(a,b){
                            return new Date(a.date) - new Date(b.date);
                        })
                        uniqueInstruments = [...new Set(instrumentArray)]
            res.render('users/searchReport', { practices, user, loggedIn, totalMinutes, composer, piece, instrument, uniqueInstruments })
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