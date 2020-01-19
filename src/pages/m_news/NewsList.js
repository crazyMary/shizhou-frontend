import { Modal, Img } from '@components'
import { parseTime } from '@shared/utils'
import NewsAdd from './NewsAdd'
import { useRef, useState, useEffect } from 'react'
const ArticleImg = Img.Default

export default function(props) {
  const newsRef = useRef()
  // 新增文章
  function addArticleModal() {
    const articleModal = Modal({
      title: '添加新闻动态',
      body: <NewsAdd ref={newsRef} />,
      onOk: async function() {
        await API.addArticle({ ...newsRef.current, createAt: Date.now() })
        await props.updateList()
        articleModal.close()
      }
    })
  }
  return (
    <div id="newList" className="news-list">
      <div className="news-list-top">
        <div className="title">新闻动态列表</div>
        <span className="addnews" onClick={addArticleModal}>
          添加
        </span>
      </div>
      <div className="news-list-body">
        {props.list.map((item, index) => {
          return (
            <div
              className={Kls('news-item', {
                'news-item-active': index === props.index
              })}
              key={item._id}
              onClick={() => props.itemClick(index)}
            >
              <div className="news-item-img">
                <ArticleImg src={item.imgSrc} />
              </div>
              <div className="news-item-text">
                <div className="title">{item.title}</div>
                <div className="keywords">{item.keywords}</div>
                <div className="createtime">{parseTime(item.createAt)}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
