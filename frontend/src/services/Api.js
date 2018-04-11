import axios from 'axios';
import store from '../store/store';

export default () => {
	return axios.create({
		baseUrl: process.env.BASE_URL || 'http://localhost:3000/',
		headers: {
			Authorization: `Bearer ${store.state.token}`,
		},
	});
};
