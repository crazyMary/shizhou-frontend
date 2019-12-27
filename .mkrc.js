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
  ENV: 'dev',
  ENV_VAR: {
    dev: {
      publicPath: '/',
      serverHost: '/'
    }
  },
  pageConf: {
    icon: '',
    __page_index__: {
      title: '史家门-登录'
    }
  }
}
