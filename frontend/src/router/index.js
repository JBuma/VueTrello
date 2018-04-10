import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/Hello'
import Register from '../components/Register'
import singleProject from '../components/Project.vue'
import Login from '../components/Login.vue'
import ProjectList from '../components/ProjectList.vue'
import NotFound from '../components/NotFound.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path:'/login',
      name: 'login',
      component: Login
    },
    {
      path: '/projects/:projectId',
      name: 'project',
      component: singleProject
    },
    {
      path: '/projects',
      name:'projects',
      component: ProjectList
	},
	{
		path:'*',
		name:'404',
		component:NotFound
	}
  ],
  mode: 'history'
})
