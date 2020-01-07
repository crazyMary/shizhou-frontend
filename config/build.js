const { webpack, fs, cwd, path } = require('./shared')

function buildDll() {
  if (fs.existsSync(path.resolve(cwd, 'dist/react_dll.js'))) {
    return Promise.resolve()
  }
  return new Promise(function(resolve) {
    webpack(require('./webpack.dll')).run(function(err) {
      if (err) return console.log(err)
      resolve()
    })
  })
}

function build() {
  webpack(require('./webpack.build')).run(function(err, stats) {
    if (err) return console.log(err)
    if (stats.compilation.errors.toString()) {
      return console.log(stats.compilation.errors.toString())
    }
    console.log(
      stats.toString({
        chunks: false,
        colors: true
      })
    )
  })
}

buildDll().then(build)
