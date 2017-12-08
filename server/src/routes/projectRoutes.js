const express = require('express')
const router = express.Router()
const { Project } = require('../models')

// create route
router.post('/user/:userId/projects/new', async function (req, res) {
  try {
    const project = await Project.create(req.body)
    res.send(project.toJSON())
  } catch (err) {
    res.status(500).send({
      error: 'An error has occured fetching your projects'
    })
  }
})

// Show route
router.get('/user/:userId/project/:projectId', async function (req, res) {
  try {
    const project = await Project.findOne({
      where: { id: req.params.projectId, authorId: req.params.userId }
    })
    var projectJson = project.toJSON()
    res.send({ projectInfo: projectJson })
  } catch (err) {
    res.status(500).send({
      error: 'An error has occured fetching your project'
    })
  }
})

// index route
router.get('/user/:userId/projects/', async function (req, res) {
  try {
    const projectList = await Project.findAll({
      where: {
        authorId: req.params.userId
      }
    })
    res.send({ projectList })
  } catch (err) {
    res.status(500).send({
      error: 'An error has occured creating your project, please try again'
    })
  }
})

module.exports = router
