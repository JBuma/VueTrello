import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/Hello'
import Register from '../components/Register'
import singleProject from '../components/Project.vue'
import Login from '../components/Login.vue'

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
      path: '/project/:id',
      name: 'project',
      component: singleProject
    }
  ],
  mode: 'history'
})
