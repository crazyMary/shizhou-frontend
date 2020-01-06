import '@shared/global.scss'
import './index.scss'

function App() {
  return (
    <div id="LoginPage" className="wrapper">
      {ENV}
    </div>
  )
}
RenderDOM(<App />, document.querySelector('#app'))
