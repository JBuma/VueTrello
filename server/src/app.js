const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/User')
const flash = require('connect-flash')

mongoose.connect('mongodb://localhost/vuetrello')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(flash())
// ===================
// PASSPORT CONFIG
// ===================
app.use(
  require('express-session')({
    secret: 'passport secret phrase',
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Check User Login on every page
app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  res.locals.error = req.flash('error')
  res.locals.succes = req.flash('succes')
  next()
})

// ==================
// ROUTES
// ==================
const authRoutes = require('./routes/authRoutes')

app.use(authRoutes)

// app.get('/', function (req, res) {
//   res.send('Hello there beepboop')
// })

// app.post('/register', (req, res) => {
//   console.log(req.body)
//   res.send('Received')
// })

app.listen(3000, function () {
  console.log('server start!')
})
// process.on('SIGHUP', () => {
//   process.exit(0)
// })
process.on('SIGINT', () => {
  console.log('Bye bye!')
  process.exit()
})
