// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './vuex/store'

Vue.use(ElementUI);

Vue.config.productionTip = false;
/* 图片上传处理 start */
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
Vue.prototype.$axios = axios
axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
