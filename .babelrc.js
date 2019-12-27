const presets = [
  [
    '@babel/env',
    {
      loose: true,
      modules: false,
      targets: '> 0.25%, not dead',
      useBuiltIns: 'entry',
      corejs: 2
    }
  ],
  '@babel/react'
]

const plugins = [
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  ['import', { libraryName: 'antd-mobile', style: 'css' }],
  '@babel/syntax-dynamic-import',
  '@babel/proposal-export-default-from'
].filter(Boolean)

module.exports = {
  presets,
  plugins
}
