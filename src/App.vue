<template>
  <div id="app">
    <GoBackBtn v-show="$route.meta.isShowGoBackBtn" />
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn">
      <keep-alive :include="include">
        <router-view />
      </keep-alive>
    </transition>
    <SettingBtn v-show="$route.meta.isShowSettingBtn" />
  </div>
</template>

<script>
import SettingBtn from '@/components/SettingBtn';
import GoBackBtn from '@/components/GoBackBtn';
export default {
  name: 'App',
  components: {
    GoBackBtn,
    SettingBtn,
  },
  data() {
    return {
      include: [],
    };
  },
  created() {},
  watch: {
    $route(to, from) {
      // 如果要to(进入)的页面是需要keepAlive缓存的，把name push进include数组中
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
      // 如果 要 form(离开) 的页面是 keepAlive缓存的，
      // 再根据 deepth 来判断是前进还是后退
      // 如果是后退：
      if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
        const index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
    },
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.animated {
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-delay: 0.1s;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}

body {
  padding: 80px !important;
}
</style>
