const { path, webpack, cwd } = require('./shared')
module.exports = {
  entry: {
    react_dll: ['react', 'react-dom', 'classnames']
  },
  output: {
    path: path.resolve(cwd, 'dist'),
    filename: '[name].js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(cwd, 'dist/[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
}
