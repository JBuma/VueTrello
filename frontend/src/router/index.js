import Vue from 'vue';
import Router from 'vue-router';
import home from '../components/Hello';
import Register from '../components/Register';
import singleProject from '../components/Project.vue';
import Login from '../components/Login.vue';
import ProjectList from '../components/ProjectList.vue';
import NotFound from '../components/NotFound.vue';
import store from '../store/store';

Vue.use(Router);

function isLoggedIn(to, from, next) {
	if (!store.state.user) {
		store.dispatch('setAlert', {
			message: 'You need to be logged in to do that',
			type: 'error',
		});
		next('/login');
	} else {
		next();
	}
}

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: home,
		},
		{
			path: '/register',
			name: 'register',
			component: Register,
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
		},
		{
			path: '/projects/:projectId',
			name: 'project',
			component: singleProject,
			beforeEnter: isLoggedIn,
		},
		{
			path: '/projects',
			name: 'projects',
			component: ProjectList,
			beforeEnter: isLoggedIn,
		},
		{
			path: '*',
			name: '404',
			component: NotFound,
		},
	],
	mode: 'history',
});
