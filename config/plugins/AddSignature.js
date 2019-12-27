class AddSignature {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('AddSignature', (compilation, callback) => {
      const jsAssets = Object.keys(compilation.assets).filter(asset =>
        /\.(js|css)$/.test(asset)
      )
      jsAssets.forEach(name => {
        const rawCode = compilation.assets[name].source()
        compilation.assets[name] = {
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

module.exports = AddSignature
