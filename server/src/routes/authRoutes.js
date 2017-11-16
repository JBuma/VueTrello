const express = require('express')
const router = express.Router()
const User = require('../models/User.js')

router.get('/', function (req, res) {
  res.send('Hello beepboop')
})

router.post('/register', function (req, res) {
  var newUser = new User({ email: req.body.email, password: req.body.password })
  User.create(newUser)
  res.send('Register Received')
})

module.exports = router
