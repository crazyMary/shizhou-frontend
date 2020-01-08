const path = require('path')
const fs = require('fs')
const Merge = require('webpack-merge')
const webpack = require('webpack')
const cwd = process.cwd()
const CLI_NODE_MODULES = path.resolve(__dirname, '../node_modules')
const EXTERNAL_NODE_MODULES = path.resolve(cwd, 'node_modules')
const DIST_PATH = path.resolve(cwd, 'dist')
const argv = require('optimist').argv
const __DEV__ = argv['dev']
const __BUILD__ = !__DEV__ && argv['build']
const EXTERNAL_CONF = require(path.resolve(cwd, './.mkrc'))
const __PAGES__ = fs.readdirSync(path.resolve(__dirname, '../src/pages'))
const ENV = __DEV__
  ? 'dev'
  : process.env.TRAVIS_BRANCH == 'master'
  ? 'production'
  : 'test'
const CUR_ENV_VAR = EXTERNAL_CONF['ENV_VAR'][ENV]
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const IP = require('ip')

// styleloader
const styleLoader = {}
styleLoader['test'] = /\.(css|scss)$/
styleLoader['use'] = __DEV__
  ? [
      'style-loader?sourceMap',
      'css-loader?sourceMap',
      'postcss-loader?sourceMap',
      'sass-loader?sourceMap'
    ]
  : [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']

module.exports = {
  path,
  fs,
  IP,
  webpack,
  cwd,
  CLI_NODE_MODULES,
  EXTERNAL_NODE_MODULES,
  __DEV__,
  EXTERNAL_CONF,
  Merge,
  DIST_PATH,
  styleLoader,
  __PAGES__,
  __BUILD__,
  ENV,
  CUR_ENV_VAR
}
