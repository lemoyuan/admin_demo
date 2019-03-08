// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

const http = axios.create({
  timeout: 1000,
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data) {
      return qs.stringify(data)
  }],
  paramsSerializer: function (data) {
      return qs.stringify(data)
  }
})
window.$http = Vue.prototype.$http = http;
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.withCredentials = true

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
