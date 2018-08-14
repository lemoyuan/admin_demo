
import axios from 'axios'
import qs from 'qs'
import router from '../router'
import store from '../vuex/store'
import {Message} from 'element-ui'

// axios 配置
axios.defaults.timeout = 8000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.withCredentials = true

axios.defaults.baseURL = "www.xxxxx.com/";

var typeHttp = '';
//POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    if (typeHttp == 'json') {
      config.data = config.data;
    } else {
      config.data = qs.stringify(config.data);
    }
  }
  return config;
}, (error) => {
  Message.error('参数错误');
  return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
  if (res.status !== 200) {
    // Message.error(res.data.msg);
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  // Message.error('异常');
  return Promise.reject(error);
});
var self = this;

export function fetch(method, url, params, type) {
  if (type == 'json') {
    typeHttp = type;
  } else {
    typeHttp = ''
  }
  return new Promise((resolve, reject) => {
    switch (method) {
      case 'post':
        axios.post(url, params)
          .then(response => {
            resolve(response.data);
            // 登录信息过期时退出重新登录
            ajaxCodeError(response.data);
            typeHttp = '';
          }, err => {
            reject(err);
            typeHttp = '';
          })
          .catch((error) => {
            reject(error)
            typeHttp = '';
          })
        break;
      case 'get':
        axios.get(url)
          .then(response => {
            if (response.headers.config) {
              store.state.resConfig = window.atob(response.headers.config.toString());
            }
            resolve(response.data);
            // 登录信息过期时退出重新登录
            ajaxCodeError(response.data);
            typeHttp = '';
          }, err => {
            reject(err);
            typeHttp = '';
          })
          .catch((error) => {
            reject(error)
            typeHttp = '';
          })
        break;
      default:
        Message.error('method出错！');
        break;
    }
  })
}

// 登录信息过期时退出重新登录
function ajaxCodeError(data) {
  if (data.code == '401') {
    router.push('/');
  }
}

export default {

}
