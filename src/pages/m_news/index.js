import './index.scss'
import { Layout } from '@components'
import NewsList from './NewsList'
import NewsDetail from './NewsDetail'

function App() {
  return (
    <Layout.Manage id="newsManagePage">
      <NewsList />
      <NewsDetail />
    </Layout.Manage>
  )
}
RenderDOM(<App />, document.querySelector('#app'))
