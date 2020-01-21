import http from '@shared/http'
import { Toast } from '@components'

http.domain = SERVER_HOST
http.errorHandler = function(code, message) {
  Toast.error(message)
}
http.unauthHandler = function(code, message) {
  Toast.error(message)
  location.href = '/'
}

const privateApi = '/api/private'
const publicApi = '/api/public'

export const login = data => http.post(`${publicApi}/user/login`, data)
export const adduser = data => http.post(`${privateApi}/user/add`, data)
export const uploadImg = data => http.post(`${privateApi}/img/upload`, data)
export const addArticle = data => http.post(`${privateApi}/article/add`, data)
export const getArticles = (params, opts) =>
  http.get(`${privateApi}/article/list`, params, opts)
export const updateArticle = data =>
  http.post(`${privateApi}/article/update`, data)
export const removeArticle = args =>
  http.send({ url: `${privateApi}/article/remove`, method: 'delete', ...args })
