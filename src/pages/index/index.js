import '@shared/global.scss'
import './index.scss'
import storage from '@shared/storage'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    API.login({ username: 'liuxiang', password: '123456' }).then(res => {
      storage.setItem('token', res.token)
    })
  }, [])
  return (
    <div id="LoginPage" className="wrapper">
      {ENV}
    </div>
  )
}
RenderDOM(<App />, document.querySelector('#app'))
