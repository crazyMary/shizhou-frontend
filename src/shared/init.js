import http from '@shared/http'
import storage from '@shared/storage'

http.domain = SERVER_HOST
http.errorHandler = function(code, message) {
  console.log()
}
console.log('!!!')

storage.prefix = `sz-${ENV}`
