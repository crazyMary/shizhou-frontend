import '@shared/global.scss'
import './index.scss'
import storage from '@shared/storage'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    API.login({ username: 'liuxiang', password: '123456' }).then(res => {
      storage
        .setItem('token', res.token)
        .setItem('refreshToken', res.refreshToken)
    })
  }, [])
  function addUser() {
    API.adduser({
      username: 'zz',
      password: '123456',
      role: 2,
      nickname: 'zz'
    })
  }
  return (
    <div id="LoginPage" className="wrapper" onClick={addUser}>
      <h1>{ENV}</h1>
      <h2>zeqi</h2>
    </div>
  )
}
RenderDOM(<App />, document.querySelector('#app'))
