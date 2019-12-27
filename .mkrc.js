const path = require('path')

module.exports = {
  PORT: 3111,
  webpack: {
    base: {
      ProvidePlugin: {
        API: path.resolve('src/api'),
        MK_URL: 'mk_url'
      },
      DefinePlugin: {},
      alias: {},
      plugins: [],
      externals: {
        ihos: 'ihos'
      }
    },
    dev: {
      plugins: []
    },
    build: {
      plugins: []
    }
  },
  API_ENV: {
    list: [{ name: '测试', value: 'test', host: '//saastest1.myweimai.com/' }],
    choosen: 'test'
  },
  pageConf: {
    icon: '',
    __page_index__: {
      title: '史家门-登录'
    }
  },
  depConf: {
    target: 'dist',
    remote: '/patient/h5',
    cdn: '//internet-hospital.myweimai.com',
    name: 'xx'
  }
}
