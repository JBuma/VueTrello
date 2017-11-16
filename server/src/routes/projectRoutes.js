const express = require('express')
const router = express.Router()
// const authPolicy = require('../policies/authPolicy.js')
// const passport = require('passport')

// IMPORT MODELS
// const User = require('../models/User.js')
const Project = require('../models/Project.js')

router.get('/:id', function (req, res) {
  Project.findById(req.params.id, function (err, foundProject) {
    if (err) {
      console.log(err)
      res.send(err)
    } else {
      res.send(foundProject)
    }
  })
})

module.exports = router
