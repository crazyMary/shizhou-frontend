import './index.scss'
import { Layout } from '@components'

function App() {
  return <Layout.Manage id="staffManagePage"></Layout.Manage>
}
RenderDOM(<App />, document.querySelector('#app'))
