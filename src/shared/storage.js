import { isStr } from '@shared/utils'
const $prefix = Symbol()

const storage = {
  [$prefix]: '',
  set prefix(val) {
    if (isStr(val)) {
      storage[$prefix] = val
    } else {
      console.warn('prefix should be string')
    }
  },
  get prefix() {
    return storage[$prefix]
  },
  setItem(key, value) {
    if (!isStr(key)) {
      console.warn('key should be string')
    } else {
      localStorage.setItem(`${storage.prefix}-${key}`, value)
      return storage
    }
  },
  getItem(key) {
    if (!isStr(key)) {
      console.warn('key should be string')
    } else {
      return localStorage.getItem(`${storage.prefix}-${key}`)
    }
  }
}

export default storage
