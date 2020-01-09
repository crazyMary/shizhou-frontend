import http from '@shared/http'
import storage from '@shared/storage'

http.domain = SERVER_HOST
http.errorHandler = function(code, message) {
  console.log(message)
}

storage.prefix = `sz-${ENV}`

export const login = params => http.post('/api/user/login', params)
export const adduser = params => http.post('/api/user/add', params)
