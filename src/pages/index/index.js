import '@shared/global.scss'
import './index.scss'
import storage from '@shared/storage'

API.login({ username: 'liuxiang', password: '123456' }).then(res => {
  storage.setItem('token', res.token)
})
function App() {
  return (
    <div id="LoginPage" className="wrapper">
      {ENV}
    </div>
  )
}
RenderDOM(<App />, document.querySelector('#app'))
