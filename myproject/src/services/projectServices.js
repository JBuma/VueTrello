import Api from './Api';
import Config from './config';

var baseUrl = `${Config.baseURL}:${Config.port}/`;

export default {
	index(userId) {
		console.log('userId: ', userId);
		return Api().get(baseUrl + 'user/' + userId + '/projects');
	},
	show(userId, projectId) {
		return Api().get(baseUrl + 'user/' + userId + '/project/' + projectId);
	},
	create(userId, info) {
		return Api().post(baseUrl + 'user/' + userId + '/projects/new', info);
	},
};
