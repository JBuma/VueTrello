const express = require('express');
const router = express.Router();
const { Task, } = require('../models');

// CREATE
router.post('/item/:itemId/tasks/new', async function (req, res) {
	try {
		const task = await Task.create(req.body);
		res.send(task.toJSON());
	} catch (err) {
		res.status(500).send({
			error: err,
		});
	}
});

// SHOW
router.get('/item/:itemId/task/:taskId', async function (req, res) {
	try {
		const task = await Task.findOne({
			where: {
				id: req.params.taskId,
				itemId: req.params.itemId,
			},
		});
		res.send(task.toJSON());
	} catch (err) {
		res.status(500).send({
			error: err,
		});
	}
});

// INDEX
router.get('/item/:itemId/tasks', async function (req, res) {
	try {
		const taskList = await Task.findAll({
			where: {
				itemId: req.params.itemId,
			},
		});
		res.send({ taskList, });
	} catch (err) {
		res.status(500).send({
			error: err,
		});
	}
});

router.post('/item/:itemId/task/:taskId', async function (req, res) {
	try {
		const newTask = req.body;
		var task = await Task.find({
			where: {
				id: req.params.taskId,
				itemId: req.params.itemId,
			},
		});
		task.update(newTask).then(() => {
			// console.log('UPDATED', task);
			res.send(task.toJSON());
		});
	} catch (err) {
		res.status(500).send({
			error: err,
		});
	}
});

module.exports = router;
