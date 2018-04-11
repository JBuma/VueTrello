const express = require('express');
const router = express.Router();
const isAuthenticated = require('../policies/isAuthenticated');
const { Task, } = require('../models');

// CREATE
router.post('/item/:itemId/tasks/new', isAuthenticated, async function (
	req,
	res
) {
	try {
		const task = await Task.create(req.body);
		res.status(200).send(task.toJSON());
	} catch (err) {
		res.status(500).send({
			error: err,
		});
	}
});

// SHOW
router.get('/item/:itemId/task/:taskId', isAuthenticated, async function (
	req,
	res
) {
	try {
		const task = await Task.findOne({
			where: {
				id: req.params.taskId,
				itemId: req.params.itemId,
			},
		});
		res.status(200).send(task.toJSON());
	} catch (err) {
		res.status(500).send({
			error: err,
		});
	}
});

// INDEX
router.get('/item/:itemId/tasks', isAuthenticated, async function (req, res) {
	try {
		const taskList = await Task.findAll({
			where: {
				itemId: req.params.itemId,
			},
		});
		res.status(200).send({ taskList, });
	} catch (err) {
		res.status(500).send({
			error: err,
		});
	}
});

// EDIT
router.post('/item/:itemId/task/:taskId', isAuthenticated, async function (
	req,
	res
) {
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
			res.status(200).send(task.toJSON());
		});
	} catch (err) {
		res.status(500).send({
			error: err,
		});
	}
});

// DELETE
router.delete('/item/:itemId/task/:taskId', isAuthenticated, async function (
	req,
	res
) {
	try {
		const task = await Task.findOne({
			where: {
				id: req.params.taskId,
				itemId: req.params.itemId,
			},
		});
		task.destroy().then(() => {
			res.status(200).send('ye');
		});
	} catch (err) {
		res.status(500).send({
			error: err,
		});
	}
});

module.exports = router;
