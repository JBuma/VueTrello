const express = require('express')
const router = express.Router()
const { Project } = require('../models')

// create route
router.post('/:userId/projects/new', async function (req, res) {
  try {
    var newProject = req.body
    newProject.authorId = req.params.userId
    const project = await Project.create(newProject)
    res.send(project.toJSON())
  } catch (err) {
    res.status(500).send({
      error: 'An error has occured fetching your projects' // TODO: Make error message
    })
  }
})

// Show route
router.get('/:userId/projects/:projectId', async function (req, res) {
  try {
    const project = await Project.findOne({
      where: { id: req.params.projectId }
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
router.get('/:userId/projects', async function (req, res) {
  try {
    // var projectList = []
    const projectList = await Project.findAll({
      where: {
        authorId: req.params.userId
      },
      limit: 10
    })
    res.send({ projectList })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      error: 'An error has occured creating your project, please try again'
    })
  }
})

module.exports = router
