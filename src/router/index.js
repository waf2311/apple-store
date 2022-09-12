import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'AppleStock',
    component: (resolve) => require(['@/views/AppleStock'], resolve),
    meta: {
      title: 'Apple库存查询',
      isShowGoBackBtn: false,
      isShowSettingBtn: true,
      needAuth: false,
      deepth: 1,
      keepAlive: true,
      background: '#fff',
    },
  },
  {
    path: '/Setting',
    name: 'Setting',
    component: (resolve) => require(['@/views/Setting/Index'], resolve),
    meta: {
      title: '系统设置',
      isShowGoBackBtn: true,
      isShowSettingBtn: false,
      needAuth: false,
      deepth: 1,
      keepAlive: true,
      background: '#fff',
    },
  },
  {
    path: '/DingRobot',
    name: 'DingRobot',
    component: (resolve) => require(['@/views/DingRobot'], resolve),
    meta: {
      title: '钉钉群机器人消息',
      isShowGoBackBtn: true,
      isShowSettingBtn: true,
      needAuth: false,
      deepth: 1,
      keepAlive: true,
      background: '#fff',
    },
  },
  {
    path: '/Bark',
    name: 'Bark',
    component: (resolve) => require(['@/views/Bark'], resolve),
    meta: {
      title: 'Bark',
      isShowGoBackBtn: true,
      isShowSettingBtn: true,
      needAuth: false,
      deepth: 1,
      keepAlive: true,
      background: '#fff',
    },
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

router.beforeEach((to, from, next) => {
  const { needAuth = false } = to.meta;
  const token = localStorage.getItem('token'); //从vuex中获取用户的登录信息
  let background = to.meta.background || '#fff';
  if (needAuth && !token) {
    // 如果页面需要登录但用户没有登录跳到登录页面
    const next_page = to.name; // 配置路由时,每一条路由都要给name赋值
    background = '#fff';
    next({
      name: 'Login',
      params: {
        redirect_page: next_page,
        ...from.params, //如果跳转需要携带参数就把参数也传递过去
      },
    });
  } else {
    //不需要登录直接放行
    next();
  }
  document.querySelector('html').style.backgroundColor = background;
});

export default router;
