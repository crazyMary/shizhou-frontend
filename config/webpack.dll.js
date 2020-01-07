const { path, webpack, cwd } = require('./shared')
const jsDir = path.resolve(cwd, 'dist')
module.exports = {
  entry: {
    react_dll: ['react', 'react-dom', 'classnames']
  },
  output: {
    path: jsDir,
    filename: '[name].js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(jsDir, '[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
}
