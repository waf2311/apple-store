<template>
  <div id="page">
    <PageLogo :img="require('@/assets/img/01.png')" appname="Bark" />
    <div class="cont">
      <div class="form">
        <textarea v-model="content" placeholder="请输入要发送的文本内容"></textarea>
      </div>
      <div class="btns">
        <button class="sub-btn" @click="startRun">立即发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import PageLogo from '@/components/PageLogo';
export default {
  name: 'Bark',
  components: {
    PageLogo,
  },
  data() {
    return {
      content: '',
    };
  },
  methods: {
    checkSetting() {
      return new Promise((resolve, reject) => {
        let BARK_KEY = localStorage.getItem('BARK_KEY') || '';
        if (BARK_KEY) {
          resolve();
        } else {
          reject();
          this.$confirm('您还未配置Bark参数，是否去配置?', '提示', {
            confirmButtonText: '立即配置',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then(() => {
              this.$router.push({
                path: '/Setting',
              });
            })
            .catch(() => {});
        }
      });
    },
    startRun() {
      this.checkSetting().then(() => {
        if (this.content.trim() == '') {
          this.$notify.error({
            title: '错误',
            message: '请输入要发送的文本内容',
          });
          return;
        }
        this.$sendBarkNotify(this.content.trim());
      });
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  width: 100%;
  textarea {
    width: 100%;
    height: 250px;
    resize: none;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    padding: 16px;
  }
}
.btns {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  .stop-btn {
    display: block;
    width: 120px;
    height: 40px;
    border: none;
    border-radius: 10px;
    line-height: 40px;
    text-align: center;
    background-color: #f53f3f;
    color: #fff;
    font-size: 14px;
    &:disabled {
      opacity: 0.3;
    }
  }
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
    &:disabled {
      opacity: 0.3;
    }
  }
}
</style>
