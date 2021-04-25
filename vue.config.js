module.exports = {
  chainWebpack:config=>{
    //生产环境
    config.when(process.env.NODE_ENV === 'production', config=>{
    //注意main-prod.js是已经存在的文件
    config.entry('app').clear().add('./src/main-prod.js')
    config.set('externals',{
      vue:'Vue',
      'vue-router':'VueRouter',
      axios:'axios',
      echarts:'echarts',
    })
      config.plugin('html').tap(args => {false
        args[0].isProd = true
        return args
      })
    })
    //开发环境
    config.when(process.env.NODE_ENV === 'development', config=>{
    //注意main-dev.js是已经存在的文件
    config.entry('app').clear().add('./src/main-dev.js')
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
            'nav-bar-background-color': '#d53c3e',
            'nav-bar-icon-color': 'white',
            'nav-bar-title-text-color': 'white',
            'nav-bar-text-color': 'white'
          },
      },
    },
  },

  productionSourceMap: false
}