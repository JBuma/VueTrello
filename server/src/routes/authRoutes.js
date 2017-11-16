const express = require('express')
const router = express.Router()
const authPolicy = require('../policies/authPolicy.js')
const passport = require('passport')

// IMPORT MODELS
const User = require('../models/User.js')
const Project = require('../models/Project.js')

router.get('/', function (req, res) {
  res.send('Hello beepboop')
})

router.post('/register', authPolicy.register, function (req, res) {
  console.log(req.body)
  var newUser = new User({ username: req.body.username })

  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err)
      return res.send({ error: err.message })
    } else {
      passport.authenticate('local')(req, res, function () {
        var author = {
          id: req.user._id,
          username: req.user.username
        }
        var newProject = { name: 'My First Project', author }
        Project.create(newProject, function (err) {
          if (err) {
            res.send(err)
          } else {
          }
        })
        res.send('User Created!')
      })
    }
  })
})

module.exports = router
