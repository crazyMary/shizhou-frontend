import http from '@shared/http'

http.domain = SERVER_HOST
http.errorHandler = function(code, message) {
  console.log()
}
