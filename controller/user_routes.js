///////////////////////////////////////
// Import dependencies
///////////////////////////////////////
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const session = require('express-session')

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
    if (req.session) {
        res.render('/practices/')
    }
    res.render('users/home')
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
                    res.redirect('/practices')
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
        res.redirect('/practices')
    })
})

///////////////////////////////////////
// export our router
///////////////////////////////////////
module.exports = router