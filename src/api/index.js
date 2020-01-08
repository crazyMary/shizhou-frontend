import http from '@shared/http'

export const login = params => http.post('/api/user/login', params)
