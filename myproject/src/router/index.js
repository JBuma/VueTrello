import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/Hello'
import Register from '../components/Register'

Vue.use(Router)

export default new Router({
	routes:[
		{
			path:'/',
			name:'home',
			component:home
		},
		{
			path:'/register',
			name:'register',
			component:Register
		}
	],
	mode:'history'
})