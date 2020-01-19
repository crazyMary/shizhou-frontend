import storage from './storage'

export function flat(arr, result = []) {
  if (!Array.isArray(arr)) return [arr]
  let len = arr.length
  let index = 0
  while (index < len) {
    result = result.concat(arr[index++])
  }
  return result
}

function isType(type) {
  return function(n) {
    return {}.toString.call(n).slice(8, -1) === type
  }
}

export const isNum = isType('Number')
export const isStr = isType('String')
export const isObj = isType('Object')
export const isFunc = isType('Function')

export class Validator {
  constructor(resolveData) {
    this.cache = []
    this.resolveData = resolveData
  }

  add(checkItem, strategy, errMsg) {
    const splitedStrategy = strategy.split(':')
    const argv = splitedStrategy[1]
    strategy = splitedStrategy[0]
    if (Reflect.has(Validator.strategies, strategy)) {
      this.cache.push({ checkItem, strategy, errMsg, argv })
    } else {
      console.warn(`undefined strategy ${strategy}`)
    }
    return this
  }

  check() {
    return new Promise((resolve, reject) => {
      for (const { checkItem, strategy, errMsg, argv } of this.cache) {
        if (!Validator.strategies[strategy](checkItem, argv)) {
          return reject(errMsg)
        }
      }
      resolve(this.resolveData)
    })
  }
}
Validator.strategies = {
  isNonEmpty: function(checkItem) {
    return checkItem !== undefined && checkItem.length
  },
  isMobile: function(checkItem) {
    return /(^1[3|5|8][0-9]{9}$)/.test(checkItem)
  },
  isURL: function(checkItem) {
    return /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(
      checkItem
    )
  },
  isID: function(checkItem) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
      checkItem
    )
  },
  isEmail: function(checkItem) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(checkItem)
  },
  minLength: function(checkItem, argv) {
    return checkItem.length >= Number(argv)
  },
  maxLength: function(checkItem, argv) {
    return checkItem.length <= Number(argv)
  }
}

export function getUserInfo() {
  return JSON.parse(storage.getItem('userInfo') || '{}')
}

export function parseTime(stamp) {
  return new Date(stamp).toLocaleString()
}

export function picUrl(name) {
  return SERVER_HOST + name
}
