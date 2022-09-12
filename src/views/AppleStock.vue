<template>
  <div id="page">
    <PageLogo iconfont="icon-04" appname="Apple库存查询" />
    <div class="cont">
      <div class="form">
        <input type="text" :readonly="isRunning" v-model="model" placeholder="请输入设备型号" />
        <input type="text" :readonly="isRunning" v-model="storeIds" placeholder="请输入Apple Store的ID" />
        <input type="text" :readonly="isRunning" v-model="city" placeholder="请输入城市" />
        <input type="text" :readonly="isRunning" v-model="noticeText" placeholder="请输入成功通知文案" />
      </div>
      <div class="btns">
        <button class="stop-btn" :disabled="!isRunning" @click="stopRun">停止执行</button>
        <button class="sub-btn ml20" :disabled="isRunning" @click="startRun">开始执行</button>
      </div>
    </div>
    <div class="logs">
      <textarea readonly v-model="logText" ref="logTextarea"></textarea>
    </div>
  </div>
</template>

<script>
import PageLogo from '@/components/PageLogo';
export default {
  name: 'AppleStock',
  components: {
    PageLogo,
  },
  data() {
    return {
      isRunning: false,
      timer: {}, //定时器
      model: 'MQ0M3CH/A', //iPhone14 Pro 256G 黑色
      storeIds: 'R532', //杭州万象城Apple Store，填一家离你近的，如果该城市有多家店，可以逗号分隔
      city: '杭州', //杭州，直营店的城市
      noticeText: 'iPhone有货了，抓紧下单', //通知文案
      logText: '',
    };
  },
  methods: {
    getData() {
      let storeList = this.storeIds.split(',') || [];
      storeList.forEach((storeId) => {
        this.$httpGet(`https://www.apple.com.cn/shop/fulfillment-messages?pl=true&mt=compact&parts.0=${this.model}&searchNearby=true&store=${storeId}`, {}, false)
          .then((res) => {
            if (res.body.content.pickupMessage.stores?.length > 0) {
              let storeData = res.body.content.pickupMessage.stores.filter((v) => v.storeNumber == storeId)[0] || {};
              let canBuy = storeData.partsAvailability[this.model].pickupDisplay == 'available' ? true : false;
              if (canBuy) {
                this.isRunning = false;
                clearInterval(this.timer);
                this.$sendNotify(`${storeId}--${this.noticeText}`);
              }
              let text = canBuy ? `${storeId}--有货了，自动发送通知\n` : `${storeId}--无货，持续挂机中\n`;
              this.logText += text;
              this.$refs.logTextarea.scrollTop = this.$refs.logTextarea.scrollHeight;
            } else {
              clearInterval(this.timer);
              setTimeout(() => {
                this.startRun();
              }, 120000);
              this.$notify.error({
                title: '错误',
                message: '查询失败',
              });
            }
          })
          .catch((err) => {
            // clearInterval(this.timer);
            this.logText += err;
            this.$refs.logTextarea.scrollTop = this.$refs.logTextarea.scrollHeight;
          });
      });
    },
    startRun() {
      if (this.model.trim() == '') {
        this.$notify.error({
          title: '错误',
          message: '请输入设备型号',
        });
        return;
      }
      if (this.storeIds.trim() == '') {
        this.$notify.error({
          title: '错误',
          message: '请输入Apple Store的ID',
        });
        return;
      }
      if (this.city.trim() == '') {
        this.$notify.error({
          title: '错误',
          message: '请输入直营店的城市',
        });
        return;
      }
      if (this.noticeText.trim() == '') {
        this.$notify.error({
          title: '错误',
          message: '请输入成功通知文案',
        });
        return;
      }
      this.isRunning = true;
      clearInterval(this.timer);
      this.getData();
      this.timer = setInterval(() => {
        this.getData();
      }, 5000);
    },
    stopRun() {
      this.isRunning = false;
      clearInterval(this.timer);
      this.logText += '已停止\n';
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  align-items: center;
  input {
    width: 25%;
    height: 40px;
    border: 1px solid #e6e6e6;
    background-color: #fff;
    padding: 0 16px;
    &:nth-child(1) {
      width: 20%;
      border-radius: 10px 0 0 10px;
    }
    &:nth-child(2) {
      width: 30%;
    }
    &:nth-child(3) {
      width: 20%;
    }
    &:nth-child(4) {
      width: 30%;
      border-radius: 0 10px 10px 0;
    }
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

.logs {
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
</style>
