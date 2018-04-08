import Api from './Api';
import Config from './config';

var baseUrl = `${Config.baseURL}:${Config.port}/`;

export default {
	index(projectId) {
		return Api().get(baseUrl + 'project/' + projectId + '/items');
	},
	show(projectId, itemId) {
		return Api().get(baseUrl + 'project/' + projectId + '/item/' + itemId);
	},
	create(projectId, info) {
		return Api().post(
			baseUrl + 'project/' + projectId + '/items/new',
			info,
		);
	},
	update(item) {
		return Api().post(
			`${baseUrl}project/${item.projectId}/item/${item.id}`,
			item,
		);
	},
};
