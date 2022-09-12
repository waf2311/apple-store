import Vue from 'vue';
import axios from 'axios';
// import router from '../router';
// import qs from 'qs';

let loading;

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    Vue.prototype.$notify.error({
      title: '系统错误',
      message: '请重新打开软件尝试',
    });
    return Promise.reject(error);
  }
);
// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    if (loading) {
      loading.close();
    }
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    Vue.prototype.$notify.error({
      title: '请求错误',
      message: '请检查相关设置项是否配置正确，尤其是通知',
    });
    return Promise.reject(error);
  }
);

Vue.prototype.$httpPost = function httpPost(url, data = {}, showLoading = true) {
  return new Promise((resolve, reject) => {
    if (showLoading) {
      loading = Vue.prototype.$loading({
        lock: true,
        text: '请稍后',
      });
    }
    axios.post(url, data).then(
      (response) => {
        if (showLoading) {
          loading.close();
        }
        resolve(response.data);
      },
      (err) => {
        if (showLoading) {
          loading.close();
        }
        reject(err);
      }
    );
  });
};

Vue.prototype.$httpGet = function httpGet(url, data = {}, showLoading = true) {
  return new Promise((resolve, reject) => {
    if (showLoading) {
      loading = Vue.prototype.$loading({
        lock: true,
        text: '请稍后',
      });
    }
    axios.get(url, data).then(
      (response) => {
        if (showLoading) {
          loading.close();
        }
        resolve(response.data);
      },
      (err) => {
        if (showLoading) {
          loading.close();
        }
        reject(err);
      }
    );
  });
};

Vue.prototype.$httpFormData = function httpFormData(url, formData, showLoading = true) {
  return new Promise((resolve, reject) => {
    if (showLoading) {
      loading = Vue.prototype.$loading({
        lock: true,
        text: '请稍后',
      });
    }
    axios.post(url, formData).then(
      (response) => {
        if (showLoading) {
          loading.close();
        }
        resolve(response.data);
      },
      (err) => {
        if (showLoading) {
          loading.close();
        }
        reject(err);
      }
    );
  });
};
