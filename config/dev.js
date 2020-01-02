const { EXTERNAL_CONF, webpack, IP } = require('./shared')
const Koa = require('koa')
const app = new Koa()
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware')
const open = require('open')
const compiler = webpack(require('./webpack.dev'))
const output = require('friendly-errors-webpack-plugin/src/output')
const origin = `${IP.address()}:${EXTERNAL_CONF.PORT}`

app.use(
  devMiddleware(compiler, {
    logLevel: 'silent',
    quiet: true
  })
)
app.use(hotMiddleware(compiler))
output.clearConsole()
app.listen(EXTERNAL_CONF.PORT, function() {
  open(`http://${origin}/${global.startPage}.html`)
})
