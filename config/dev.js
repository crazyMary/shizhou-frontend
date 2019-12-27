const { EXTERNAL_CONF, webpack, getLocalIP } = require('./shared')
const Koa = require('koa')
const app = new Koa()
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware')
const open = require('open')
const compiler = webpack(require('./webpack.dev'))
const output = require('friendly-errors-webpack-plugin/src/output')
const PORT = EXTERNAL_CONF.PORT

app.use(
  devMiddleware(compiler, {
    logLevel: 'silent',
    quiet: true
  })
)
app.use(hotMiddleware(compiler))

output.clearConsole()

open(`http://${getLocalIP()}:${PORT}/${global.startPage}.html`)

app.listen(PORT)
