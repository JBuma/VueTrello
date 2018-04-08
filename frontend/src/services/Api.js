import axios from 'axios';

export default () => {
	return axios.create({
		baseUrl: process.env.BASE_URL || 'http://localhost:3000/',
	});
};
