const { webpack } = require('./shared')
const conf = require('./webpack.build')

webpack(conf).run(function(err, stats) {
  if (err) {
    return console.log(err)
  }
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
