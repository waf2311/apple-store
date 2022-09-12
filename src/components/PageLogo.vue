<template>
  <div id="page-logo">
    <div class="logo">
      <i v-if="iconfont" class="iconfont" :class="iconfont"></i>
      <img v-if="img" :src="img" />
    </div>
    <div class="name">{{ appname }}</div>
  </div>
</template>

<script>
export default {
  props: {
    iconfont: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
    appname: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
#page-logo {
  text-align: center;
}
.logo {
  i {
    font-size: 100px;
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 24px;
  }
}
.name {
  padding: 30px 0;
  font-size: 24px;
  font-weight: bold;
}
</style>
