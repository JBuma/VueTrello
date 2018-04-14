const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const { sequelize, } = require('./models');
const https = require('https');
const fs = require('fs');
const path = require('path');

// mongoose.connect('mongodb://localhost/vuetrello')

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
require('./passport');

// ==================
// ROUTES
// ==================
// Gather routes from routes folder and use them
fs
	.readdirSync(path.join(__dirname, '/routes'))
	.filter(file => file !== 'index.js')
	.forEach(file => {
		// const route = require(path.join(__dirname, file));
		app.use(require(path.join(__dirname, '/routes/', file)));
	});

/* eslint-disable no-console */
process.on('SIGINT', () => {
	console.log('Bye bye!');
	process.exit();
});

if (process.env.NODE_ENV !== 'production') {
	sequelize.sync().then(() => {
		app.listen(config.port, function () {
			console.log(
				process.env.NODE_ENV + ' server started on port ' + config.port
			);
		});
	});
} else {
	sequelize.sync().then(() => {
		var options = {
			key: fs.readFileSync(
				'/etc/letsencrypt/live/testerino.space/privkey.pem'
			),
			cert: fs.readFileSync(
				'/etc/letsencrypt/live/testerino.space/cert.pem'
			),
			ca: fs.readFileSync(
				'/etc/letsencrypt/live/testerino.space/chain.pem'
			),
		};

		https.createServer(options, app).listen(3000);
	});
}
