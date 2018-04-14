const express = require('express');
const router = express.Router();
const authPolicy = require('../policies/authPolicy.js');
const { User, } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function jwtSignUser (user) {
	const ONE_WEEK = 60 * 60 * 24 * 7;
	return jwt.sign(user, config.authentication.jwtSecret, {
		expiresIn: ONE_WEEK,
	});
}

router.name = 'Authorization';

// IMPORT MODELS

router.get('/', function (req, res) {
	res.send('Hello beepboop');
});

// REGISTER
router.post('/register', authPolicy.register, async function (req, res) {
	try {
		// Create User and a demo project
		const user = await User.create(req.body);
		const userJson = user.toJSON();
		// Send user info + Project link
		res.send({
			user: {
				username: userJson.username,
				email: userJson.email,
				id: userJson.id,
			},
			token: jwtSignUser(userJson),
		});
	} catch (err) {
		console.log(err);
		res.status(400).send({
			error: err,
		});
	}
});

// Login
router.post('/login', async function (req, res) {
	try {
		const { email, password, } = req.body;
		const user = await User.findOne({
			where: {
				email: email,
			},
		});

		if (!user) {
			return res.status(403).send({
				error: 'The login information was incorrect',
			});
		}

		const isPasswordValid = await user.comparePassword(password);
		if (!isPasswordValid) {
			return res.status(403).send({
				error: 'The login information was incorrect',
			});
		}

		const userJson = user.toJSON();
		res.send({
			user: {
				username: userJson.username,
				email: userJson.email,
				id: userJson.id,
			},
			token: jwtSignUser(userJson),
		});
	} catch (err) {
		res.status(500).send({
			error: 'An error has occured trying to log in',
		});
	}
});

module.exports = router;
