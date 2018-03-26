const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const { sequelize, } = require('./models');

// mongoose.connect('mongodb://localhost/vuetrello')

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// ==================
// ROUTES
// ==================
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const itemRoutes = require('./routes/itemRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(authRoutes);
app.use(projectRoutes);
app.use(itemRoutes);
app.use(taskRoutes);

process.on('SIGINT', () => {
	console.log('Bye bye!');
	process.exit();
});

sequelize.sync().then(() => {
	app.listen(config.port, function () {
		console.log('server started on port ' + config.port);
	});
});
