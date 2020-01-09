import { create, CancelToken } from 'axios'
import { isFunc, isStr } from './utils'
import storage from './storage'
const instance = create()
const pendings = []
const SUCCESS_CODE = 200
function removePending(config) {
  const index = pendings.findIndex(pending => pending['url'] === config['url'])
  index > -1 && pendings.splice(index, 1)['c']()
}

instance.interceptors.request.use(
  function(config) {
    removePending(config)
    config.cancelToken = new CancelToken(c =>
      pendings.push({ url: config.url, c })
    )
    config.headers.Authorization = 'Bearer ' + storage.getItem('token')
    return config
  },
  e => Promise.reject(e)
)

instance.interceptors.response.use(
  res =>
    new Promise((resolve, reject) => {
      let { code, data, message } = res.data
      if (code === SUCCESS_CODE) {
        resolve(data)
      } else {
        http.errorHandler(code, message)
        reject(res.data)
      }
      removePending(res.config)
    }),
  e => {
    const status = e.response.status
    switch (status) {
      case 401:
        http.errorHandler(status, '用户未登录')
        break
      case 403:
        http.errorHandler(status, 'token失效')
        break
      default:
        break
    }
  }
)

const http = {
  domain: '',
  errorHandler: () => {},
  get: (url, params) => {
    return http.send({ method: 'get', url, params })
  },
  post: (url, data) => {
    return http.send({ method: 'post', url, data })
  },
  send: args => {
    args.url = http.domain + args.url
    return instance(args)
  }
}

const httpProxy = new Proxy(http, {
  set(target, key, value) {
    switch (key) {
      case 'errorHandler': {
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
