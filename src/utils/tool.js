
import {Message} from 'element-ui'
import {MessageBox} from 'element-ui';
import * as cityJson from './city.js';
import * as iconFile from './icon.js';
import * as menuFile from './menu.js';
import store from '../store/index.js'

/**
 * 富文本编辑器时上传图片
 * * type = file 上传文件和图片
 * * type = ''  其他地址
 */

export function ipValue(type) {
  if (type == 'file') { //上传文件和图片
    // return  '//192.168.10.66:8083';//gy
    // return '//192.168.10.104:6081';//zpg
    // return '//47.105.75.94:3389';
     return JSON.parse(store.state.resConfig).site_resource_url;
    // return '//resource.heyin.com';
  } else {
    // return  '//192.168.10.98:8080';
    // return  '//192.168.10.53:8081';
    //  return  '//192.168.10.92:8088'; //cxy
    //  return  '//192.168.10.67:8080/p2p-manage'; //dqy
    // return  '//192.168.10.99:8090';//zmx
    // return  '//192.168.10.104:6080';//zpg
    // return  '//192.168.10.66:8081';//gy
    // return '//manage.p2p.test';
    return '//47.105.75.94:8080';//formal
  }
}

/**
 * 获取路由下的权限
 */
export function  aaa(data,path) {
    for (let i = 0; i < data.length; i++) {
      let one = data[i].menus;

      for (let j = 0;j<one.length;j++) {
        if (one[j].menus.length == 0) {
          if(one[j].vuePath == path){
            return {
              groupId:one[j].groupId,
              menuId:one[j].id
            }
          }
        }else{
          let two = one[j].menus;
          for(let k=0;k<two.length;k++){
            if(two[k].vuePath == path){
              return {
                groupId:two[k].groupId,
                menuId:two[k].id
              }
            }
          }

        }

      }
    }
}

/**
 * 分享h5链接地址
 */
export function shareUrl() {
  // var url = window.location;
  //线上环境
  return JSON.parse(store.state.resConfig).site_mobile_url+'/';
  // return '//wap.ark.xin/#/'
}

/**
 * 前台社区地址
 */
export function communityUrl() {
  //线上环境
  return comUrl.cUrl();
}

/**
 *   Tip MessageMessage公共方法
 *   type      success/warning/info/error
 *   content   消息文字
 *   duration  显示时间, 毫秒。设为 0 则不会自动关闭
 *   close     是否显示关闭按钮 true/false
 */
export function message(type, content, close) {
  Message({
    type: type,
    message: content,
    duration: 2000,
    showClose: close
  });
}

/**
 * 美化字符串
 */
export function beautySub(str, len) {
  if(!str){
    return "";
  } 
  var reg = /[\u4e00-\u9fa5]/g,    //专业匹配中文
      slice = str.substring(0, len),
      chineseCharNum = (~~(slice.match(reg) && slice.match(reg).length)),
      realen = slice.length*2 - chineseCharNum;
  return str.substr(0, realen) + (realen < str.length ? "..." : "");
}

/**
 * *  Tip  公共方法
 * *  type 1/2  1 删除  2 是否发布 3 自定义
 * *  pushType （type 1 时） 发布状态   0 取消发布  1 发布
 * *  value 自定义内容
 */
export function commonTip(type, pushType, value) {
  var content = '';
  switch (type) {
    case 1:
      content = '删除';
      break;
    case 2:
      if (pushType == 0) {
        content = '取消发布';
      } else {
        content = '发布';
      }
      break;
    case 3:
      content = value;
      break;
  }
  var cont = type != 3 ? '确定要' + content + '吗？' : content;
  return new Promise((resolve, reject) => {
    MessageBox.confirm(cont, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: type == 1 ? 'warning' : 'info',
    }).then(() => {
      resolve(true);
    }).catch(() => {
      message('info', '已取消')
      reject(false);
    });
  })
}


// export function downloadTip(type, pushType,value) {
//     var cont =  value;
//     return new Promise((resolve, reject) => {
//         MessageBox.confirm(cont, {
//             showCancelButton:false,
//             showConfirmButton:false,
//             center: true,
//             dangerouslyUseHTMLString: true,
//             type: type,
//         }).then(() => {
//             resolve(true);
//         }).catch(() => {
//             message('info', '已取消')
//             reject(false);
//         });
//     })
// }


/**
 * * sessionStorage 设置
 */

export function setStorage(name, value) {
  var val = JSON.stringify(value);
  window.sessionStorage.setItem(name, val);
}

/**
 * * sessionStorage 获取
 */

export function getStorage(name) {
  var storageValue = window.sessionStorage.getItem(name);
  var value = JSON.parse(storageValue);
  return value;
}


/**
 * * sessionStorage 删除
 */

export function delStorage(name) {
  if (name) {
    window.sessionStorage.removeItem(name);
  } else {
    window.sessionStorage.clear();
  }
}


/**
 * cookie 设置
 *     cname 存入的参数名
 *     value  存入的值
 *     exdays  过期时间
 */

export function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + escape(cvalue) + "; " + expires;
}

/**
 * cookie 获取

 */
export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}

/**
 * cookie 删除
 */

export function delCookie(name) {
  setCookie('JSESSIONID', "", -1);
  setCookie('treasureFinal', "", -1);
}

/**
 * 修改时间戳
 *   fmt  例如：yyyy-MM-dd hh:mm:ss
 */
export function getDate(val, fmt) {
  if (!val) {
    return '';
  }
  if (val && val.length == 10) {
    val = parseInt(val * 1000);
  }
  var date = new Date(val);
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};


/**
 * 获取url链接地址参数
 *
 */
export function searchUrl() {
  var url = window.location.hash;
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.split("?")[1];
    var strs = [];
    if (url.indexOf("&") != -1) {
      strs = str.split("&");
    } else {
      strs.push(str);
    }
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}


/**
 * base64加密开始
 *
 */
var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" +
  "wxyz0123456789+/" + "=";

export function encode64(input) {
  var output = "";
  var chr1, chr2, chr3 = "";
  var enc1, enc2, enc3, enc4 = "";
  var i = 0;
  do {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) +
      keyStr.charAt(enc3) + keyStr.charAt(enc4);
    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
  } while (i < input.length);

  return output;
}

/**
 * 获取icon的JSON
 *
 */
export function iconList() {
  return iconFile.iconJson;
}

/**
 * 获取menu的ARR
 *
 */
export function menuList() {
  return menuFile.menuJson;
}

/**
 * 获取menu的名字 string
 *
 */
export function menuName(id) {
  var name = '';
  if (menuFile.menuJson.length > 0) {
    menuFile.menuJson.forEach(function (key, index) {
      if (id == key.routerUrl) {
        name = key.vueUrl;
      }
    });
  }
  return name;
}


/**
 * 城市选择的处理 list
 *
 */
export function cityList(id) {
  var list = [];
  var i = 0;
  if (cityJson.city.length > 0) {
    cityJson.city.forEach(function (key, index) {
      if (id == key.pid) {
        list[i] = key;
        i++;
      }
    });
  }
  if (list.length == 1 && list[0].name == '0') {
    list = [];
  }
  return list;
}

/**
 * 获取城市名字 string
 *
 */
export function cityName(id) {
  var name = '';
  if (cityJson.city.length > 0) {
    cityJson.city.forEach(function (key, index) {
      if (id == key.id) {
        name = key.name;
      }
    });
  }
  if (name == '0') {
    name = '';
  }
  return name;
}


/**
 * 表单题目添加的所有类型
 * *  formType null 返回所有类型 / != null 返回某一个
 */

export function questionTypes(formType) {
  var list = [
    {name: '单行输入', value: 1},
    {name: '多行输入', value: 2},
    {name: '单项选择', value: 3},
    {name: '地址（省市区关联）', value: 4},
    {name: '时间', value: 5},
    {name: '多项选择', value: 6},
    {name: '上传', value: 7},
  ]
  var obj = {};
  if (formType) {
    list.forEach(function (key, index) {
      if (formType == key.value) {
        obj = key;
      }
    });
    return obj;
  } else {
    return list;
  }
}

/**
 * 设置初始的div[class="el-col-tac2"]的滚动高度
 * 避免初始化时富文本编辑器上面的部分被隐藏
 * *
 */
export function divScrollTop(formType) {
  var nodeName = document.getElementsByClassName('el-col-tac2');
  if (nodeName) {
    nodeName[0].scrollTop = '0px';
  }
}


