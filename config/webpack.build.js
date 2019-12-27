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
  __BUILD__ANALYZER__
} = require('./shared')
const base = require('./webpack.base')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConf = require('./webpack.base')
const AddSignature = require('./plugins/AddSignature')
const { remote, name, cdn } = EXTERNAL_CONF.depConf

const mode = 'production'
const output = {
  path: DIST_PATH,
  filename: 'static/js/[name].[contenthash:8].js',
  chunkFilename: 'static/js/[name].[contenthash:8].js',
  pathinfo: false,
  publicPath: cdn + path.join('/', remote, process.env.API_ENV, name)
}
// plugins
const webpackParallelUglifyPlugin = new WebpackParallelUglifyPlugin({
  uglifyJS: {
    output: { beautify: false, comments: false },
    compress: { drop_console: true, collapse_vars: true, reduce_vars: true }
  }
})
const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: 'static/css/[name].[contenthash:8].css',
  chunkFilename: 'static/css/[name].[contenthash:8].css'
})
const optimizeCSSAssetsPlugin = new OptimizeCSSAssetsPlugin()
const plugins = [
  miniCssExtractPlugin,
  new AddSignature(),
  new webpack.HashedModuleIdsPlugin(),
  __BUILD__ANALYZER__ && new BundleAnalyzerPlugin()
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
        },
        'react-dll': {
          test: /[\\/]node_modules[\\/](react|react-dom|classnames)/,
          name: 'react-dll',
          priority: 10,
          enforce: true
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  }
})
