/////////////////////////////////
// import dependencies
/////////////////////////////////
// this allows us to load our env variables
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const moment = require('moment')
const practiceRoutes = require('./controller/practice_routes')
const userRoutes = require('./controller/user_routes')
const entryRoutes = require('./controller/entry_routes')


////////////////////////////////////////////
// Create our express application object
////////////////////////////////////////////
const app = require('liquid-express-views')(express())

////////////////////////////////////////////
// Middleware
////////////////////////////////////////////
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
const session = require('express-session')
const MongoStore = require('connect-mongo')

// here's the middleware that sets up our sessions
app.use(
	session({
		secret: process.env.SECRET,
		store: MongoStore.create({
			mongoUrl: process.env.DATABASE_URI
		}),
		saveUninitialized: true,
		resave: false
	})
)

// TRY THIS OUT
function auth(req, res, next) {
    // Checking for the session
    console.log(req.session)
	let loggedIn;
	let user;
    // Checking for the authorization
    if (req.session.username) {
		loggedIn = true;
		user = req.session.username
		console.log('logged in?', loggedIn)
		console.log('welcome ', user)
		next()
	} else {
		loggedIn = false;
		console.log('logged in?', loggedIn)
		next()
	}
}

app.use(auth)

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.use('/practices', practiceRoutes)
app.use('/users', userRoutes)
app.use('/entries', entryRoutes)

// localhost:3000/
app.get('/', (req, res) => {
	//res.send('your server is running, better go catch it')
	res.redirect('/practices')
})

////////////////////////////////////////////
// Server Listener
////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`app is listening on port: ${PORT}`)
})