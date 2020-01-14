const open = require('open')

class OpenBrowserPlugin {
  constructor(url) {
    this.url = url
  }

  apply(compiler) {
    let isWatching = false // 监听模式下才会在第一次编译完成时打开默认浏览器
    let isOpened = false

    // 监听 watchRun hook
    compiler.hooks.watchRun.tapAsync(
      'OpenBrowserPlugin',
      (compiler, callback) => {
        isWatching = true
        callback()
      }
    )

    // 监听编译完成的 hook
    compiler.hooks.done.tap('OpenBrowserPlugin', stats => {
      if (isWatching && !isOpened && !stats.hasErrors()) {
        isOpened = true // 只在第一次完成编译时打开浏览器
        open(this.url)
      }
    })
  }
}

module.exports = OpenBrowserPlugin
