import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 清除默认样式
import './static/normalize.css'
import api from './../axios/index'

import Vant from 'vant';
import 'vant/lib/index.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VCharts from 'v-charts'

Vue.use(VCharts)
Vue.use(Vant);
Vue.use(ElementUI);
Vue.use(api);

Vue.config.productionTip = false

// to 即将要进入的目标，from 当前导航正要离开的路由，next 调用 next() 进行管道中的下一个钩子
router.beforeEach((to, from, next) => { 
  if (to.meta.loginRequest) { // 如果路由 meta 中 loginRequest 为 true，进行拦截
    if (localStorage.getItem('token')) {// 如果已经登录可直接进入页面
      next() 
    } else { // 若没有登录
      alert('请登录')
      next({
        path: '/login',
        query: {
          redirect: to.fullPath // 把要跳转的页面路径作为参数传到登录页面
        }
      })
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
