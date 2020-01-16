import './index.scss'
import { Layout, Button } from '@components'

function App() {
  return (
    <Layout.Manage id="newsManagePage">
      <div className="news-list">
        <div className="news-list-top">
          <div className="title">新闻动态列表</div>
          <span className="addnews">添加</span>
        </div>
      </div>
      <div className="news-detail">2</div>
    </Layout.Manage>
  )
}
RenderDOM(<App />, document.querySelector('#app'))
