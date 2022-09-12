import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    redirectUrl: '/', //如果操作完需要跳转来的地方，那么先把当前地方存起来
  },
  mutations: {
    update(state, [key, value]) {
      state[key] = value;
    },
  },
  actions: {},
  modules: {},
});
