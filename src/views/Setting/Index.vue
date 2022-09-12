<template>
  <div id="page">
    <PageLogo iconfont="icon-01" appname="系统设置" />
    <div class="form">
      <div class="form-item">
        <div class="mod">通知相关设置</div>
        <div class="form-line mt20">
          <div class="label">Bark通知秘钥</div>
          <div class="input">
            <input type="text" v-model="BARK_KEY" placeholder="留空表示不发该通知" />
          </div>
        </div>
        <div class="form-line mt20">
          <div class="label">钉钉群机器人通知ACCESS_TOKEN</div>
          <div class="input">
            <input type="text" v-model="DING_ACCESS_TOKEN" placeholder="留空表示不发该通知" />
          </div>
        </div>
        <div class="form-line mt20">
          <div class="label">钉钉群机器人通知SECRET</div>
          <div class="input">
            <input type="text" v-model="DING_SECRET" placeholder="留空表示不发该通知" />
          </div>
        </div>
      </div>
      <!-- <div class="form-item mt40">
        <div class="mod">Cookie相关设置</div>
        <div class="form-line mt20">
          <div class="label">禅道Cookie</div>
          <div class="textarea">
            <textarea v-model="ZENTAO_COOIKE" placeholder="请输入禅道Cookie"></textarea>
          </div>
        </div>
      </div> -->
    </div>
    <div class="btns">
      <button class="sub-btn" @click="saveToStorage">保存</button>
    </div>
  </div>
</template>

<script>
import PageLogo from '@/components/PageLogo';
export default {
  name: 'Setting',
  components: {
    PageLogo,
  },
  data() {
    return {
      BARK_KEY: '',
      DING_ACCESS_TOKEN: '',
      DING_SECRET: '',
      ZENTAO_COOIKE: '',
    };
  },
  methods: {
    saveToStorage() {
      localStorage.setItem('BARK_KEY', this.BARK_KEY);
      localStorage.setItem('DING_ACCESS_TOKEN', this.DING_ACCESS_TOKEN);
      localStorage.setItem('DING_SECRET', this.DING_SECRET);
      localStorage.setItem('ZENTAO_COOIKE', this.ZENTAO_COOIKE);
      this.$notify.success({
        title: '成功',
        message: '信息已保存至localStorage',
      });
    },
  },
  created() {
    this.BARK_KEY = localStorage.getItem('BARK_KEY') || '';
    this.DING_ACCESS_TOKEN = localStorage.getItem('DING_ACCESS_TOKEN') || '';
    this.DING_SECRET = localStorage.getItem('DING_SECRET') || '';
    this.ZENTAO_COOIKE = localStorage.getItem('ZENTAO_COOIKE') || '';
  },
};
</script>

<style scoped lang="scss">
.form {
  width: 100%;
  .form-item {
    .mod {
      font-size: 18px;
      font-weight: bold;
    }
    .form-line {
      width: 100%;
      .label {
        font-size: 14px;
        font-weight: bold;
      }
      .input {
        width: 100%;
        margin-top: 10px;
        input {
          width: 100%;
          height: 40px;
          border: 1px solid #e6e6e6;
          border-radius: 10px;
          padding: 0 16px;
          background-color: #fff;
        }
      }
      .textarea {
        width: 100%;
        margin-top: 10px;
        textarea {
          width: 100%;
          height: 80px;
          border: 1px solid #e6e6e6;
          border-radius: 10px;
          padding: 16px;
          background-color: #fff;
          resize: none;
        }
      }
    }
  }
}
.btns {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  margin-top: 30px;
  .sub-btn {
    display: block;
    width: 120px;
    height: 40px;
    border: none;
    border-radius: 10px;
    line-height: 40px;
    text-align: center;
    background-color: #1989fa;
    color: #fff;
    font-size: 14px;
  }
}
</style>
