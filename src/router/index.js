import Vue from 'vue'
import Router from 'vue-router'
import {Toast} from 'vant';

import signIn from '../pages/signIn'
import home from '../pages/home/home';
import addCustomer from '../pages/home/addCustomer';
import customerDetail from '../pages/home/customerDetail';

import myMessage from '../pages/message/myMessage';
import myAchievement from '../pages/achievement/myAchievement'
import myRanking from '../pages/achievement/myRanking'

import personCenter from '../pages/personCenter/personCenter'
import myWeekly from '../pages/personCenter/myWeekly'
import monthlyReport from '../pages/personCenter/monthlyReport'
import myReimburse from '../pages/personCenter/myReimburse'
import viewSales from '../pages/achievement/viewSales'


import {getlocalStorage, setSessionStorage, removeSessionStorage} from "../config/Utils";


const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) { //解决连续点击同一路由控制台报错
  this.isleft = false;
  this.isright = false;
  return originalPush.call(this, location).catch(err => err)
};

// 需要左方向动画的路由用this.$router.togo('****')
Router.prototype.togo = function (path) {
  this.isleft = true;
  this.isright = false;
  this.push(path)
};

// 需要右方向动画的路由用this.$router.goRight('****')
Router.prototype.goRight = function (path) {
  this.isright = true;
  this.isleft = false;
  this.push(path)
};
// 需要返回按钮动画的路由用this.$router.goBack()，返回上一个路由
Router.prototype.goBack = function () {
  this.isright = true;
  this.isleft = false;
  this.go(-1)
};
// 点击浏览器返回按钮执行，此时不需要路由回退
Router.prototype.togoback = function () {
  this.isright = true;
  this.isleft = false
};
Vue.use(Router);

const router = new Router({
  mode: 'hash',
  routes: [
    //地址为空时跳转home页面
    {
      path: '',
      redirect: '/signIn',
    },
    //地址为空时跳转home页面
    //首页商城列表页
    {
      path: '/home', // 首页
      name: "home",
      component: home,
      meta: {
        title: '首页',
        keepAlive: true
      }
    },
    {
      path: '/addCustomer', // 首页
      name: "addCustomer",
      component: addCustomer,
      meta: {
        title: '首页',
        keepAlive: true
      }
    },
    {
      path: '/customerDetail', // 首页
      name: "customerDetail",
      component: customerDetail,
      meta: {
        title: '客户消费详情',
      }
    },

    {
      path: '/myAchievement', //业绩
      name: "myAchievement",
      component: myAchievement,
      meta: {
        title: '业绩'
      }
    },
    {
      path: '/myRanking', //业绩排行
      name: "myRanking",
      component: myRanking,
      meta: {
        title: '业绩排行'
      }
    },

    {
      path: '/signIn', // 登录注册
      name: "signIn",
      component: signIn,
      meta: {
        title: '登录注册'
      }
    },
    {
      path: '/myMessage', //消息通知
      name: "myMessage",
      component: myMessage,
      meta: {
        title: '消息通知',
        requireAuth: true
      }
    },
    {
      path: '/personCenter', // 个人中心
      name: "personCenter",
      component: personCenter,
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/myWeekly', // 周报
      name: "myWeekly",
      component: myWeekly,
      meta: {
        title: '周报'
      }
    },
    {
      path: '/monthlyReport', // 月报
      name: "monthlyReport",
      component: monthlyReport,
      meta: {
        title: '月报'
      }
    },
    {
      path: '/myReimburse', // 月报
      name: "myReimburse",
      component: myReimburse,
      meta: {
        title: '我的报销单'
      }
    },
    {
      path: '/viewSales', // 查看销售额
      name: "viewSales",
      component: viewSales,
      meta: {
        title: '查看销售额'
      }
    },




  ],
});

router.beforeEach((to, from, next) => {
  if (from.path == '/personCenter') {
    if (!(to.path == '/myReimburse' || to.path == '/monthlyReport' || to.path == '/myWeekly')) {
      removeSessionStorage('active')
    }
  }
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  window.scrollTo(0, 0);
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    // if (getlocalStorage("token")) {
    next();
    // } else {
    //   Toast("请先登录");
    //   next({
    //     path: '/signIn',
    //   })
    // }
  } else {
    next()
  }
});
export default router;


