import Vue from 'vue';

Vue.prototype.$notifySuccess = (message) => {
  Vue.prototype.$notify.success({
    title: '成功',
    message,
  });
};

Vue.prototype.$notifyError = (message) => {
  Vue.prototype.$notify.error({
    title: '失败',
    message,
  });
};

// 校验类,小写v开头，含义verify

// 校验手机号码
export const vPhoneTest = (data) => {
  let reg = /^[1][3456789][0-9]{9}$/;
  return reg.test(data) ? false : true;
};

// 转换类,小写c开头，含义conversion

// 标准时间转换
export const cDateFormat = (time) => {
  let datetime = new Date(time);
  let year = datetime.getFullYear();
  let month = datetime.getMonth();
  let date = datetime.getDate();
  let hour = datetime.getHours();
  let minute = datetime.getMinutes();
  let second = datetime.getSeconds();
  let result1 =
    year +
    '-' +
    (month + 1 >= 10 ? month + 1 : '0' + (month + 1)) +
    '-' +
    (date + 1 < 10 ? '0' + date : date) +
    ' ' +
    (hour + 1 < 10 ? '0' + hour : hour) +
    ':' +
    (minute + 1 < 10 ? '0' + minute : minute) +
    ':' +
    (second + 1 < 10 ? '0' + second : second);

  let result2 = year + '-' + (month + 1 >= 10 ? month + 1 : '0' + (month + 1)) + '-' + (date + 1 < 10 ? '0' + date : date);
  let result = {
    dateTime: result1,
    date: result2,
  };
  return result;
};
