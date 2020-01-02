const {
  fs,
  path,
  webpack,
  cwd,
  CLI_NODE_MODULES,
  EXTERNAL_NODE_MODULES,
  __DEV__,
  EXTERNAL_CONF,
  __PAGES__,
  CUR_ENV_VAR,
  ENV,
  styleLoader,
  Merge
} = require('./shared')
const { ProvidePlugin, DefinePlugin, NoEmitOnErrorsPlugin } = webpack
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const entry = {}
__PAGES__.forEach(function(page) {
  entry[page] = [`./src/pages/${page}/index.js`]
  __DEV__ &&
    entry[page].push(
      path.resolve(
        CLI_NODE_MODULES,
        'webpack-hot-middleware/client?reload=true'
      )
    )
})

// loaders
const scriptLoader = {}
scriptLoader['test'] = /\.(js)$/
scriptLoader['include'] = path.resolve(cwd, 'src')
scriptLoader['exclude'] = [CLI_NODE_MODULES, EXTERNAL_NODE_MODULES]
scriptLoader['use'] = [{ loader: 'happypack/loader?id=happyloader' }]

const urlLoader = {}
urlLoader['test'] = /\.(png|jpg|gif)$/i
urlLoader['use'] = [{ loader: 'url-loader', options: { limit: 8192 } }]

const fileLoader = {}
fileLoader['test'] = /\.(png|jpe?g|gif)$/i
fileLoader['use'] = {
  loader: 'file-loader',
  options: {
    name: '[name].[contenthash:8].[ext]',
    outputPath: 'static/image'
  }
}

// plugin
const pagesPlugin = __PAGES__.map(function(chunk) {
  const pageConf = EXTERNAL_CONF['pageConf']
  const pageKeys = Object.keys(pageConf)
  let chunkPageConf = {}
  for (let index = 0; index < pageKeys.length; index++) {
    const key = pageKeys[index]
    if (!/^__page_.+__$/.test(key)) {
      chunkPageConf[key] = pageConf[key]
      continue
    }
    if (key.match(/^__page_(.+)__$/)[1] == chunk) {
      chunkPageConf = { ...chunkPageConf, ...pageConf[key] }
    }
  }
  return new HtmlWebpackPlugin({
    templateContent: require('./template')(chunkPageConf),
    filename: `${chunk}.html`,
    excludeChunks: __PAGES__.filter(page => page != chunk),
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true
    }
  })
})

const providePlugin = new ProvidePlugin(
  Merge(
    {
      React: 'react',
      RenderDOM: ['react-dom', 'render'],
      Kls: 'classnames'
    },
    EXTERNAL_CONF['webpack']['base']['ProvidePlugin']
  )
)

function stringifyValue(o) {
  const ret = {}
  for (const key in o) {
    ret[key] = JSON.stringify(o[key])
  }
  return ret
}
const definePlugin = new DefinePlugin(
  Merge(
    {
      ENV: JSON.stringify(ENV),
      SERVER_HOST: JSON.stringify(CUR_ENV_VAR.serverHost)
    },
    stringifyValue(EXTERNAL_CONF['webpack']['base']['DefinePlugin'])
  )
)

const scriptHappyPackPlugin = new HappyPack({
  id: 'happyloader',
  threads: 4,
  verbose: false,
  loaders: [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        babelrc: false,
        extends: path.resolve(__dirname, '../.babelrc.js')
      }
    }
  ]
})

const plugins = [
  ...pagesPlugin,
  providePlugin,
  definePlugin,
  scriptHappyPackPlugin,
  new NoEmitOnErrorsPlugin(),
  new FriendlyErrorsWebpackPlugin({ clearConsole: true })
].concat(EXTERNAL_CONF['webpack']['base']['plugins'])

// resolve
const resolve = {}
resolve['extensions'] = ['.js', '.scss', '.css']
resolve['alias'] = Merge(
  {
    '@components': path.resolve(cwd, 'src/components'),
    '@shared': path.resolve(cwd, 'src/shared'),
    '@assets': path.resolve(cwd, 'src/assets')
  },
  EXTERNAL_CONF['webpack']['base']['alias']
)
resolve['modules'] = [CLI_NODE_MODULES, EXTERNAL_NODE_MODULES]

// externals
const externals = Merge({}, EXTERNAL_CONF['webpack']['base']['externals'])

module.exports = {
  entry,
  module: { rules: [scriptLoader, styleLoader, fileLoader] },
  plugins,
  resolve,
  externals
}
