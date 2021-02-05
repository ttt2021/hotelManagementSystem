import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 清除默认样式
import './static/normalize.css'
import api from './../axios/index'

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(api);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
