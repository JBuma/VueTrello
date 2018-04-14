const express = require('express');
const router = express.Router();
const { Comment, User, } = require('../models');

router.name = 'Comments';

// CREATE
router.post('/task/:taskId/comments/new', async function (req, res) {
	try {
		// const comment = await Comment.create(req.body)
		Comment.create(req.body).then(comment => {
			Comment.findOne({
				where: {
					id: comment.id,
				},
				include: {
					model: User,
				},
			}).then(comment => {
				res.status(200).send(comment);
			});
		});
	} catch (err) {
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
			/* eslint-disable*/
			include: [User],
			/* eslint-enable */
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
			/* eslint-disable*/
			include: [User],
			/* eslint-enable */
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
				TaskId: req.params.taskId,
			},
			include: { model: User, },
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
			include: { model: User, },
		});
		comment.destroy().then(() => {
			res.status(200).send('Comment succesfully deleted');
		});
	} catch (err) {
		res.status(500).send({
			error: err,
		});
	}
});

module.exports = router;
