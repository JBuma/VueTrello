const fs = require('fs');
const path = require('path');
const routes = {};

fs
	.readdirSync(__dirname)
	.filter(file => file !== 'index.js')
	.forEach(file => {
		const route = require(path.join(__dirname, file));
		console.log('=======Filename:', path.join(__dirname, file));
		routes[route.name] = route;
		// db[model.name] = model;
	});
// console.log('======Routes:', routes);
module.exports = routes;
