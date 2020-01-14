const {
  fs,
  path,
  webpack,
  cwd,
  Merge,
  DIST_PATH,
  CLI_NODE_MODULES,
  EXTERNAL_NODE_MODULES,
  EXTERNAL_CONF,
  IP
} = require('./shared')
const OpenBrowserPlugin = require('./extend/OpenBrowserPlugin')
const baseConf = require('./webpack.base')

const mode = 'development'
const output = {
  filename: '[name].js',
  publicPath: `//${IP.address()}:${EXTERNAL_CONF.PORT}/`
}
const devtool = 'cheap-module-eval-source-map'
// plugins
const HMR_plugin = new webpack.HotModuleReplacementPlugin()
const plugins = [
  HMR_plugin,
  new OpenBrowserPlugin(
    `http://${IP.address()}:${EXTERNAL_CONF.PORT}/${global.startPage}.html`
  )
].concat(EXTERNAL_CONF['webpack']['dev']['plugins'])

module.exports = Merge(baseConf, {
  mode,
  output,
  plugins,
  devtool
})
