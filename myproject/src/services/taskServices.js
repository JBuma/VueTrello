import Api from './Api';
import Config from './config';

var baseUrl = `${Config.baseURL}:${Config.port}/`;

export default {
	index(itemId) {
		return Api().get(baseUrl + 'item/' + itemId + '/tasks');
	},
	show(itemId, taskId) {
		return Api().get(baseUrl + 'item/' + itemId + '/task/' + taskId);
	},
	create(itemId, info) {
		return Api().post(baseUrl + 'item/' + itemId + '/tasks/new', info);
	},
	update(task) {
		return Api().post(
			`${baseUrl}item/${task.ItemId}/task/${task.id}`,
			task,
		);
	},
	delete(task) {
		return Api().delete(
			`${baseUrl}item/${task.ItemId}/task/${task.id}`,
			task,
		);
	},
};
