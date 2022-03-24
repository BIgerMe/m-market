const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  publicPath: "./",
  // devServer: {
  //   // webSocketServer:false,
  //   compress: true,
  // },
  configureWebpack() {
    return {
      externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'axios': 'axios',
        'vant':'vant',
      },
    }
  },
})
