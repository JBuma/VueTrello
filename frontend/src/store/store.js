import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
	strict: true,
	plugins: [createPersistedState()],
	state: {
		token: null,
		user: null,
		isUserLoggedIn: false,
		task: null,
	},
	mutations: {
		setToken(state, token) {
			state.token = token;
			if (token) {
				state.isUserLoggedIn = true;
			} else {
				state.isUserLoggedIn = false;
			}
		},
		setUser(state, user) {
			state.user = user;
		},
		setTask(state, task) {
			state.task = task;
		},
	},
	actions: {
		setToken({ commit }, token) {
			commit('setToken', token);
		},
		setUser({ commit }, user) {
			commit('setUser', user);
		},
		setTask({ commit }, task) {
			commit('setTask', task);
		},
	},
});
