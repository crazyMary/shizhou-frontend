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
  CUR_ENV_VAR
} = require('./shared')
const base = require('./webpack.base')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const AddSignaturePlugin = require('./extend/AddSignaturePlugin')
const baseConf = require('./webpack.base')

const mode = 'production'
const output = {
  path: DIST_PATH,
  filename: 'static/js/[name].[contenthash:8].js',
  chunkFilename: 'static/js/[name].[contenthash:8].js',
  pathinfo: false,
  publicPath: CUR_ENV_VAR['publicPath']
}
// plugins
const webpackParallelUglifyPlugin = new WebpackParallelUglifyPlugin({
  uglifyJS: {
    output: { beautify: false, comments: false },
    compress: { drop_console: false, collapse_vars: true, reduce_vars: true }
  }
})
const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: 'static/css/[name].[contenthash:8].css',
  chunkFilename: 'static/css/[name].[contenthash:8].css'
})
const optimizeCSSAssetsPlugin = new OptimizeCSSAssetsPlugin()
const plugins = [
  miniCssExtractPlugin,
  new webpack.HashedModuleIdsPlugin(),
  new webpack.DllReferencePlugin({
    manifest: require(path.join(cwd, 'dist/react_dll-manifest.json'))
  }),
  new AddAssetHtmlPlugin({
    filepath: path.resolve(cwd, 'dist/react_dll.js')
  }),
  new AddSignaturePlugin()
]
  .concat(EXTERNAL_CONF['webpack']['build']['plugins'])
  .filter(Boolean)
module.exports = Merge(baseConf, {
  mode,
  output,
  plugins,
  optimization: {
    noEmitOnErrors: true,
    namedModules: true,
    namedChunks: true,
    mergeDuplicateChunks: true,
    minimizer: [webpackParallelUglifyPlugin, optimizeCSSAssetsPlugin],
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10,
          enforce: true
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  }
})
