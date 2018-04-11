const express = require('express');
const router = express.Router();
const { Project, } = require('../models');
const isAuthenticated = require('../policies/isAuthenticated');

// create route
router.post('/user/:userId/projects/new', isAuthenticated, async function (
	req,
	res
) {
	try {
		const project = await Project.create(req.body);
		res.send(project.toJSON());
	} catch (err) {
		res.status(500).send({
			error: 'An error has occured fetching your projects',
		});
	}
});

// Show route
router.get('/user/:userId/project/:projectId', isAuthenticated, async function (
	req,
	res
) {
	try {
		const project = await Project.findOne({
			where: { id: req.params.projectId, authorId: req.params.userId, },
		});
		// var projectJson = project.toJSON();
		res.send(project.toJSON());
	} catch (err) {
		res.status(500).send({
			error: 'An error has occured fetching your project',
		});
	}
});

// index route
router.get('/user/:userId/projects/', isAuthenticated, async function (
	req,
	res
) {
	try {
		const projectList = await Project.findAll({
			where: {
				authorId: req.params.userId,
			},
		});
		res.status(200).send({ projectList, });
	} catch (err) {
		res.status(500).send({
			error:
				'An error has occured creating your project, please try again',
		});
	}
});

// Update
router.post('/user/:userId/project/:projectId', isAuthenticated, async function (
	req,
	res
) {
	try {
		const project = await Project.findOne({
			where: {
				authorId: req.params.userId,
				id: req.params.projectId,
			},
		});
		project.update(req.body).then(() => {
			res.status(200).send(project.toJSON());
		});
	} catch (err) {
		res.status(500).send({
			error: err,
		});
	}
});

module.exports = router;
