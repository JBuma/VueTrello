const express = require('express')
const router = express.Router()
const { Item } = require('../models')

// CREATE
router.post('/project/:projectId/items/new', async function (req, res) {
  try {
    const item = await Item.create(req.body)
    console.log(item)
    res.send(item.toJSON())
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})

// SHOW
router.get('/project/:projectId/item/:itemId', async function (req, res) {
  try {
    const item = await Item.findOne({
      where: {
        id: req.params.itemId,
        projectId: req.params.projectId
      }
    })
    res.send(item.toJSON())
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})

// INDEX
router.get('/project/:projectId/items', async function (req, res) {
  try {
    const itemList = await Item.findAll({
      where: {
        projectId: req.params.projectId
      }
    })
    res.send({ itemList })
  } catch (err) {
    res.status(500).send({
      error: err
    })
  }
})

module.exports = router
