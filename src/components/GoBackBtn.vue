<template>
  <div id="go-back-btn" @click="$router.go(-1)">
    <i class="iconfont icon-05"></i>
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
#go-back-btn {
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 30px;
  left: 30px;
  z-index: 199;
  text-align: center;
  cursor: pointer;
  i {
    font-size: 20px;
    line-height: 40px;
  }
}
</style>
