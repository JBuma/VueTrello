const express = require('express');
const router = express.Router();
const { Comment, } = require('../models');

// CREATE
router.post('/task/:taskId/comments/new', async function (req, res) {
	try {
		const comment = await Comment.create(req.body);
		res.status(200).send(comment.toJSON());
	} catch (err) {
		console.log(err);
		res.status(500).send({
			error: err,
		});
	}
});

// SHOW
router.get('/task/:taskId/comment/:commentId', async function (req, res) {
	try {
		const comment = await Comment.findOne({
			where: {
				id: req.params.commentId,
				taskId: req.params.taskId,
			},
		});
		res.status(200).send(comment.toJSON());
	} catch (err) {
		res.status(500).send({
			error: err,
		});
	}
});

// INDEX
router.get('/task/:taskId/comments', async function (req, res) {
	try {
		const commentList = await Comment.findAll({
			where: {
				taskId: req.params.taskId,
			},
		});
		res.status(200).send({ commentList, });
	} catch (err) {
		res.status(500).send({
			error: err,
		});
	}
});

// EDIT
router.post('/task/:taskId/comment/:commentId', async function (req, res) {
	try {
		const newComment = req.body;
		var comment = await Comment.find({
			where: {
				id: req.params.commentId,
				taskId: req.params.taskId,
			},
		});
		comment.update(newComment).then(() => {
			// console.log('UPDATED', comment);
			res.status(200).send(comment.toJSON());
		});
	} catch (err) {
		res.status(500).send({
			error: err,
		});
	}
});

// DELETE
router.delete('/task/:taskId/comment/:commentId', async function (req, res) {
	try {
		const comment = await Comment.findOne({
			where: {
				id: req.params.commentId,
				taskId: req.params.taskId,
			},
		});
		comment.destroy().then(() => {
			res.status(200).send('ye');
		});
	} catch (err) {
		res.status(500).send({
			error: err,
		});
	}
});

module.exports = router;
