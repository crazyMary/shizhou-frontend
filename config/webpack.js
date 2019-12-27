const inquirer = require('inquirer')
const { __PAGES__, __DEV__, EXTERNAL_CONF, __BUILD__ } = require('./shared')

if (__DEV__) {
  inquirer
    .prompt([
      {
        name: 'cc',
        type: 'list',
        message: '===选择启动页===',
        choices: __PAGES__.map(page => ({ name: page, value: page })),
        default: __PAGES__[0]
      }
    ])
    .then(function(answer) {
      global.startPage = answer.cc || answer
      require('./dev')
    })
}

if (__BUILD__) {
  require('./build')
}
