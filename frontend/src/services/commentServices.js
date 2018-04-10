import Api from './Api';
import Config from './config';

var baseUrl = `${Config.baseURL}:${Config.port}/`;

export default {
	index(taskId) {
		return Api().get(baseUrl + 'task/' + taskId + '/comments');
	},
	show(taskId, commentId) {
		return Api().get(baseUrl + 'task/' + taskId + '/comment/' + commentId);
	},
	create(taskId, info) {
		return Api().post(baseUrl + 'task/' + taskId + '/comments/new', info);
	},
	update(comment) {
		return Api().post(
			`${baseUrl}task/${comment.ItemId}/comment/${comment.id}`,
			comment,
		);
	},
	delete(comment) {
		return Api().delete(
			`${baseUrl}task/${comment.ItemId}/comment/${comment.id}`,
			comment,
		);
	},
};
