class AddSignaturePlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('AddSignaturePlugin', (compilation, callback) => {
      const assets = compilation.assets
      const buildAssets = Object.keys(assets).filter(asset =>
        /^static.+\.js$/.test(asset)
      )
      buildAssets.forEach(name => {
        const rawCode = assets[name].source()
        assets[name] = {
          source: () =>
            rawCode.replace(
              /^/,
              '/** \n' +
                '* File created at: ' +
                new Date().toLocaleString() +
                '\n' +
                '* By: ' +
                process.env.USER +
                '\n' +
                '**/' +
                '\n'
            ),
          size: () => rawCode.length
        }
      })
      callback()
    })
  }
}

module.exports = AddSignaturePlugin
