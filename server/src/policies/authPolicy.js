const Joi = require('joi');

module.exports = {
	register (req, res, next) {
		const schema = {
			username: Joi.string().regex(new RegExp('^.{3,32}')),
			email: Joi.string().email(),
			password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$')),
		};
		Joi.validate(req.body, schema, function (err, val) {
			if (err) {
				if (err.details[0].context.key.toString() === 'username') {
					res.status(400).send({
						error:
							'Username name must be between 3 and 32 characters long.',
					});
				} else if (err.details[0].context.key.toString() === 'email') {
					res.status(400).send({
						error: 'Your email must be valid',
					});
				} else if (err.details[0].context.key === 'password') {
					res.status(400).send({
						error:
							'Password can contain only letters and numbers, and must be between 8 and 32 characters long.',
					});
				} else {
					res.status(400).send({
						error: err.message,
					});
				}
			} else {
				next();
			}
		});
	},
};
