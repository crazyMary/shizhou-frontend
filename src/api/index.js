import http from '@shared/http'
import { Toast } from '@components'

http.domain = SERVER_HOST
http.errorHandler = function(code, message) {
  Toast.error(message)
}

const privateApi = '/api/private'
const publicApi = '/api/public'

export const login = params => http.post(`${publicApi}/user/login`, params)
export const adduser = params => http.post(`${privateApi}/user/add`, params)
