<template>
  <div id="index">
    <div class="ul">
      <router-link class="li" style="background-color: rgba(0, 0, 0, 0.8)" :to="{ path: '/AppleStock' }">Apple库存查询</router-link>
      <router-link class="li" style="background-color: rgba(50, 150, 250, 0.8)" :to="{ path: '/DingRobot' }">钉钉群机器人消息</router-link>
      <router-link class="li" style="background-color: rgba(255, 59, 48, 0.8)" :to="{ path: '/Bark' }">Bark</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {},
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>

<style scoped lang="scss">
.ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .li {
    width: 32%;
    height: 120px;
    margin-left: 2%;
    margin-bottom: 16px;
    border-radius: 10px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
    &:nth-child(3n + 1) {
      margin-left: 0;
    }
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
