const inquirer = require('inquirer')
const { __PAGES__, __DEV__, EXTERNAL_CONF, __BUILD__ } = require('./shared')
const { list: envChoices, choosen: choosenEnv } = EXTERNAL_CONF['API_ENV']
function chooseEnv() {
  return inquirer.prompt([
    {
      name: 'cc',
      type: 'list',
      message: '===选择(启动|编译)环境===',
      choices: envChoices,
      default: choosenEnv
    }
  ])
}

if (__DEV__) {
  chooseEnv()
    .then(answer => {
      process.env.API_ENV = answer.cc
      if (__PAGES__.length > 1) {
        return inquirer.prompt([
          {
            name: 'cc',
            type: 'list',
            message: '===选择启动页===',
            choices: __PAGES__.map(page => ({ name: page, value: page })),
            default: __PAGES__[0]
          }
        ])
      } else {
        return __PAGES__[0]
      }
    })
    .then(function(answer) {
      global.startPage = answer.cc || answer
      require('./dev')
    })
}

if (__BUILD__) {
  chooseEnv().then(answer => {
    process.env.API_ENV = answer.cc
    require('./build')
  })
}
