import Mock from "mockjs";

//模拟延迟
Mock.setup({
  // timeout: 300,
});

//模拟接口

// 获取用户信息
Mock.mock("/login", {
  errcode: 1,
  message: "接口正常",
  data: {
    username: "张三",
    age: 18,
    gender: "男",
    birthday: "@datetime",
  },
});
