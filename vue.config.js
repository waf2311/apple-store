// 参考https://github.com/staven630/vue-cli4-config

const webpack = require('webpack');
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  publicPath: './', // 默认'/'，部署应用包时的基本 URL
  outputDir: 'dist', // 'dist', 生产环境构建文件的目录
  assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  configureWebpack: (config) => {
    const plugins = [
      new CompressionPlugin({
        algorithm: 'gzip', // 使用gzip压缩
        test: /\.js$|\.html$|\.css$/, // 匹配文件名
        filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
        minRatio: 1, // 压缩率小于1才会压缩
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
      }),
    ];

    config.externals = {
      // vue: "Vue",
      // "vue-router": "VueRouter",
      // vuex: "Vuex",
      // axios: "axios"
    };

    config.plugins = [...config.plugins, ...plugins];
  },

  chainWebpack: (config) => {
    config.plugin('ignore').use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/));
    if (IS_PROD) {
      // config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin); // 打包分析文件
    }
    // 添加别名
    config.resolve.alias.set('@', resolve('src')).set('@img', resolve('src/assets/img'));
    return config;
  },
  css: {
    extract: IS_PROD,
    sourceMap: false,
  },
  lintOnSave: true,
  runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require('os').cpus().length > 1,
  pwa: {},
  devServer: {
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true,
    },
    open: false, // 是否打开浏览器
    host: '0.0.0.0',
    port: '8080', // 代理端口
    https: false,
    hotOnly: true, // 热更新
    // proxy: {},
  },
};
