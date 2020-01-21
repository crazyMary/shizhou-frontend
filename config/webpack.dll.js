const { path, webpack } = require('./shared')

module.exports = {
  entry: {
    react_dll: ['react', 'react-dom', 'classnames', 'wangeditor']
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve('dist/[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
}
