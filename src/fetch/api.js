import axios from 'axios'
import qs from 'qs'
import router from '../router'
import store from '../store/index.js'
import * as _ from '../utils/tool'
import {Message} from 'element-ui'

// axios 配置
axios.defaults.timeout = 8000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.withCredentials = true

axios.defaults.baseURL = _.ipValue();
// axios.defaults.baseURL = '//192.168.10.99:8090';

var typeHttp = '';

//base64带中文的解密方式
var Base64 = {
  // private property
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  // public method for decoding
  decode: function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = Base64._utf8_decode(output);
    return output;
  },
  // private method for UTF-8 encoding
  _utf8_decode: function (utftext) {
    let string = "";
    let i = 0;
    let c2 = 0;
    let c1 = 0;
    let c3 = 0;
    let c = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {

        string += String.fromCharCode(c);
        i++;
      }
      else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      }
      else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;

      }
    }
    return string;
  }
}

//POST传参序列化
axios.interceptors.request.use((config) => {
  // Do something before request is sent
  // if (sessionStorage.getItem('token')) {
  //     // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  //     config.headers['X-Token'] = sessionStorage.getItem('token')
  // }
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
  if (res.data.code == 400) {
    sessionStorage.clear();
    router.push('/vue/login');
    // router.go(0);
  } else if (res.status !== 200) {
    // Message.error(res.data.msg);
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  // Message.error('异常');
  return Promise.reject(error);
});
var self = this;

export function fetch(method, url, params, type, contentType) {
  if (type == 'json') {
    typeHttp = type;
  } else {
    typeHttp = ''
  }
  return new Promise((resolve, reject) => {
    switch (method) {
      case 'post':
        if (contentType === 'json') {
          axios.post(url, params, {
            headers: {
              'Content-Type': 'application/json',
            }
          })
            .then(response => {
              typeHttp = '';
              resolve(response.data);
            }, err => {
              typeHttp = '';
              reject(err);
            })
            .catch((error) => {
              typeHttp = '';
              reject(error)
            })
        } else {
          axios.post(url, params,)
            .then(response => {
              // console.log(response.headers);
              if (response.headers.config) {
                store.state.resConfig = Base64.decode(response.headers.config.toString());
                sessionStorage.setItem(
                  "resConfig",
                  Base64.decode(response.headers.config.toString())
                );
                // console.log(store.state.resConfig);
              }
              typeHttp = '';
              resolve(response.data);

            }, err => {
              typeHttp = '';
              reject(err);
            })
            .catch((error) => {
              typeHttp = '';
              reject(error)
            })
        }
        break;
      case 'get':
        axios.get(url)
          .then(response => {
            typeHttp = '';
            if (response.headers.config) {
              store.state.resConfig = Base64.decode(response.headers.config.toString());
              sessionStorage.setItem(
                "resConfig",
                Base64.decode(response.headers.config.toString())
              );
              // console.log(store.state.resConfig);
            }

            resolve(response.data);
          }, err => {
            typeHttp = '';
            reject(err);
          })
          .catch((error) => {
            typeHttp = '';
            reject(error)
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
  /**
   *  图形验证码
   */
  getCodeImg() {
    return fetch('get', '/common/validImg.html')
  },
  /** 2
   * 用户登录
   */
  login(params) {
    return fetch('post', '/site/login.html', params)
  },
  /** 3
   * 用户退出
   */
  logout(params) {
    return fetch('get', '/admin/site/logout.html', params)
  },
  
}
