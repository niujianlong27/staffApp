// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './config/rem'
import store from './store/'
import http from './utils/http'
import VueTouch from 'vue-touch'
import FastClick from 'fastclick'
import {Notify} from 'vant';
import vueJsonp from 'vue-jsonp'
import Mui from 'vue-awesome-mui';
import VueCookies from 'vue-cookies'
import echarts from 'echarts'
// 将echarts注册到Vue组件的原型对象中去
Vue.prototype.$echarts = echarts;
Vue.use(VueCookies);
Vue.use(Mui);
Vue.use(vueJsonp);
Vue.use(Notify);
Vue.use(VueTouch, {name: 'v-touch'});

VueTouch.config.swipe = {
  threshold: 80  //设置左右滑动的距离
};

Vue.config.productionTip = false;
Vue.prototype.$http = http;
FastClick.attach(document.body);

Vue.filter('YYYY-HH-DD', function (value) {
  let arr = value.split(" ");
  return arr[0]
});

Vue.filter('setImg', function (value) {
  if (value && value.indexOf("http") >= 0) {
    return value
  } else {
    return `http://test.tonginfo.com:8084/prod-api/file/download?&fileName=${value}`

  }
});

Vue.filter('fixNum', function (value) {

  if (value && !isNaN(value)) { // 判断是否是数字 ，字符串数字、数字false
    let num = Number(value).toString();
    let newVal = "";
    if (num % 1 == 0) {//整数
      newVal = num + "." + '0'.padEnd(2, '0'); // 小数点后0不足3位，补足
    } else {//小数
      let num1 = num.split(".");
      if (num1[1].length < 2) {
        newVal = num1[0] + "." + num1[1].padEnd(2, '0')
      } else {
        newVal = num1[0] + "." + num1[1].substring(0, 2)// 超出3位剪切
      }
    }
    return newVal;
  }
  return 0
});

Vue.filter('setDate', function (value) {
  let date = new Date(value);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = date.getDate() + ' ';
  let h = date.getHours() + ':';
  let m = date.getMinutes() + ':';
  let s = date.getSeconds();
  return Y + M + D;
});


Vue.filter('setStr', function (value) {
  return value.substr(-4);
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
