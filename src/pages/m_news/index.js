import './index.scss'
import { Layout } from '@components'
import NewsList from './NewsList'
import NewsDetail from './NewsDetail'
import { useState, useEffect } from 'react'
import { picUrl } from '@shared/utils'
export const initForm = { title: '', keywords: '', imgSrc: '', content: '' }

function App() {
  const [index, setIndex] = useState(0)
  const [list, setList] = useState([])
  useEffect(() => {
    updateList()
  }, [])
  // 更新文章列表
  async function updateList() {
    const res = await API.getArticles()
    setList(res)
  }
  // 设置当前文章项目
  function itemClick(index) {
    setIndex(index)
  }
  return (
    <Layout.Manage id="newsManagePage">
      <NewsList
        list={list}
        index={index}
        updateList={updateList}
        itemClick={itemClick}
        setIndex={setIndex}
      />
      {list.length ? (
        <NewsDetail form={list[index] || initForm} updateList={updateList} />
      ) : null}
    </Layout.Manage>
  )
}
RenderDOM(<App />, document.querySelector('#app'))
