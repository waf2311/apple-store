import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 实用工具
import './utils/utils';

//引入封装的请求和拦截器
import './utils/request';

//引入封装的发送通知
import './utils/sendNotify';

//开发环境引入mockjs
// if (process.env.NODE_ENV == 'development') require('@/mock');

import './assets/css/reset.css';
import './assets/css/common.css';
import './assets/css/style.css';
import './assets/iconfont/iconfont.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  data: {},
  methods: {},
  created() {},
  render: (h) => h(App),
}).$mount('#app');
