module.exports = {
  env: {
    browser: true
  },
  parser: 'babel-eslint',
  plugins: ['prettier', 'react-hooks'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'prettier/prettier': 'error'
  }
}
