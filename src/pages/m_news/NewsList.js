import { Modal } from '@components/'
import NewsAdd from './NewsAdd'
Modal({
  title: '添加新闻动态',
  body: <NewsAdd />
})
export default function() {
  return (
    <div className="news-list">
      <div className="news-list-top">
        <div className="title">新闻动态列表</div>
        <span className="addnews">添加</span>
      </div>
    </div>
  )
}
