module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-var': 'error',
    'no-else-return': 2, //如果if语句里面有return,后面不能跟else语句
    'no-empty': 2, //块语句中的内容不能为空
    'no-eval': 2, //禁止使用eval
    'no-irregular-whitespace': 2, //不能有不规则的空格
    'no-mixed-spaces-and-tabs': [2, false], //禁止混用tab和空格
    'no-multi-spaces': 1, //不能用多余的空格
    'no-multi-str': 2, //字符串不能用换行
    'no-multiple-empty-lines': [1, { max: 2 }], //空行最多不能超过2行
    'no-script-url': 2, //禁止使用javascript:void(0)
    'arrow-parens': 2, //箭头函数用小括号括起来
    curly: [2, 'all'], //必须使用 if(){} 中的{}
    indent: [2, 2], //缩进风格
    quotes: [1, 'single'],
  },
};
