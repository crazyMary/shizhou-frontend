import { create, CancelToken } from 'axios'
import { isFunc, isStr } from './utils'
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
    config.headers.Authorization = '11'
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
  e => Promise.reject(e)
)

const http = {
  domain: '',
  errorHandler: () => {},
  get: (url, params) => {
    params = Object.assign({}, params, { _: Date.now() })
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
