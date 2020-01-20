import { create, CancelToken } from 'axios'
import { isFunc, isStr } from './utils'
import storage from './storage'
const instance = create()
const SUCCESS_CODE = 200
const UNAUTH_CODE = 401
const OUTDATEAUTH_CODE = 403
let httpLock = false
let httpQueue = []

instance.interceptors.request.use(
  function(config) {
    config.headers.Authorization = 'Bearer ' + storage.getItem('token')
    return config
  },
  e => Promise.reject(e)
)

instance.interceptors.response.use(
  res =>
    new Promise((resolve, reject) => {
      const { code, data, message } = res.data
      if (code === SUCCESS_CODE) {
        resolve(data)
      } else {
        http.errorHandler(code, message)
        reject(res.data)
      }
    }),
  e => {
    const status = e.response.status
    switch (status) {
      case UNAUTH_CODE:
        http.unauthHandler(status, '用户未登录或者认证过期')
        break
      default:
        break
    }
    const err = new Error(status)
    err.status = status
    throw err
  }
)

const http = {
  domain: '',
  errorHandler: () => {},
  unauthHandler: () => {},
  tokenUpdateHandler: async () => {
    const res = await http.get('/api/user/refreshToken', {
      refreshToken: storage.getItem('refreshToken')
    })
    storage
      .setItem('token', res.token)
      .setItem('refreshToken', res.refreshToken)
  },
  get: (url, params) => {
    return http.send({ method: 'get', url, params })
  },
  post: (url, data) => {
    return http.send({ method: 'post', url, data })
  },
  send: async args => {
    try {
      const setting = Object.assign({}, args, { url: http.domain + args.url })
      if (!httpLock || setting.url.match(/refreshToken$/)) {
        return await instance(setting)
      } else {
        return new Promise(resolve => {
          httpQueue.push(resolve) //收集403之后的请求 待重新发送
        }).then(() => instance(setting))
      }
    } catch (e) {
      if (e.status === OUTDATEAUTH_CODE) {
        httpLock = true
        await http.tokenUpdateHandler()
        httpLock = false
        const responese = await http.send(args)
        httpQueue.forEach(item => item())
        httpQueue = []
        return responese
      } else {
        return Promise.reject(e)
      }
    }
  }
}

const httpProxy = new Proxy(http, {
  set(target, key, value) {
    switch (key) {
      case 'errorHandler':
      case 'tokenUpdateHandler':
      case 'unauthHandler': {
        if (isFunc(value)) {
          return (target[key] = value)
        } else {
          console.warn('errorHandler should be typeof function')
        }
        break
      }
      case 'domain': {
        if (isStr(value)) {
          return (target[key] = value)
        } else {
          console.warn('domain should be typeof string')
        }
        break
      }
      default:
        console.warn(`${key} can't be set`)
        break
    }
    return true
  }
})

export default httpProxy
