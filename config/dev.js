const { EXTERNAL_CONF, webpack } = require('./shared')
const Koa = require('koa')
const app = new Koa()
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware')
const compiler = webpack(require('./webpack.dev'))
const output = require('friendly-errors-webpack-plugin/src/output')

app.use(
  devMiddleware(compiler, {
    logLevel: 'silent',
    quiet: true
  })
)
app.use(hotMiddleware(compiler))
output.clearConsole()
app.listen(EXTERNAL_CONF.PORT)
