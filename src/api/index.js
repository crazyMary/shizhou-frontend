import http from '@shared/http'
import storage from '@shared/storage'
import { Toast } from '@components'

storage.prefix = `sz-${ENV}`

http.domain = SERVER_HOST
http.errorHandler = function(code, message) {
  Toast.error(message)
}

export const login = params => http.post('/api/user/login', params)
export const adduser = params => http.post('/api/user/add', params)
