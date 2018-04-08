import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import router from './router/index'
import {sync} from 'vuex-router-sync'
import store from './store/store'

Vue.use(VueResource)
sync(store, router)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
