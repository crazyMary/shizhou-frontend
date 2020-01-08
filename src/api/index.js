import http from '@shared/http'
console.log(http.domain)
export const login = params => http.post('/api/user/login', params)
