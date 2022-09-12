<template>
  <div id="setting-btn">
    <router-link :to="{ path: '/Setting' }">
      <i class="iconfont icon-01"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
#setting-btn {
  display: inline-block;
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 199;
  i {
    font-size: 30px;
  }
}
</style>
