import Vue from 'vue';
import crypto from 'crypto';

Vue.prototype.$sendNotify = (content) => {
  Vue.prototype.$sendBarkNotify(content);
  Vue.prototype.$sendDingNotify(content);
};

// 发送Bark消息
Vue.prototype.$sendBarkNotify = (content) => {
  let BARK_KEY = localStorage.getItem('BARK_KEY') || '';
  if (BARK_KEY) {
    Vue.prototype.$httpGet(`https://api.day.app/${BARK_KEY}/${encodeURIComponent(content)}`).then((res) => {
      if (res.code == 200) {
        Vue.prototype.$notifySuccess('Bark通知发送成功');
      } else {
        Vue.prototype.$notifyError('Bark通知发送失败');
      }
    });
  }
};

// 发送钉钉群机器人消息
Vue.prototype.$sendDingNotify = (content) => {
  let DING_ACCESS_TOKEN = localStorage.getItem('DING_ACCESS_TOKEN') || '';
  let DING_SECRET = localStorage.getItem('DING_SECRET') || '';
  if (DING_ACCESS_TOKEN && DING_SECRET) {
    let timestamp = Date.parse(new Date());
    let sign = encodeURIComponent(crypto.createHmac('sha256', DING_SECRET).update(`${timestamp}\n${DING_SECRET}`).digest().toString('base64'));
    let url = `https://oapi.dingtalk.com/robot/send?access_token=${DING_ACCESS_TOKEN}&timestamp=${timestamp}&sign=${sign}`;
    let data = {
      msgtype: 'text',
      text: {
        content,
      },
    };
    Vue.prototype.$httpPost(url, data).then((res) => {
      if (res.errcode == 0) {
        Vue.prototype.$notifySuccess('钉钉机器人通知发送成功');
      } else {
        Vue.prototype.$notifyError('钉钉机器人通知发送失败');
      }
    });
  }
};
