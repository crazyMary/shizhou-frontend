import '@shared/global.scss'
import './index.scss'
import pic from '@assets/1.png'

function App() {
  return (
    <div id="LoginPage">
      <img src={pic} alt="" />
    </div>
  )
}
RenderDOM(<App />, document.querySelector('#app'))
