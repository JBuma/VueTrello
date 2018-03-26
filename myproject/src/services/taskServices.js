import Api from './Api';
import Config from './config';

var baseUrl = Config.baseURL;

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
	post(taskId, task) {
		return Api().post(`${baseUrl}item/${itemId}/task/${taskId}`, task);
	},
};
