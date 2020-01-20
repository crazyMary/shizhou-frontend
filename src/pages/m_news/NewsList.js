import { Modal, Img, Toast } from '@components'
import { parseTime, picUrl, Validator } from '@shared/utils'
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
      onOk: function() {
        const validator = new Validator()
        validator
          .add(newsRef.current.title, 'isNonEmpty', '标题不能为空')
          .add(newsRef.current.content, 'isNonEmpty', '内容不能为空')
          .check()
          .then(async () => {
            await API.addArticle({ ...newsRef.current, createAt: Date.now() })
            await props.updateList()
            props.setIndex(0)
            articleModal.close()
          })
          .catch(msg => {
            Toast.info(msg)
          })
      }
    })
  }
  // 移除文章
  async function removeArticle(index) {
    await API.removeArticle({ params: { _id: props.list[index]['_id'] } })
    await props.updateList()
    if (index === props.index) {
      props.setIndex(0)
    }
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
                <ArticleImg src={picUrl(item.imgSrc)} />
              </div>
              <div className="news-item-text">
                <div className="title">{item.title}</div>
                <div>
                  <i className="field-title">关键词:</i>
                  <span className="keywords">{item.keywords}</span>
                </div>
                <div>
                  <i className="field-title">发表于:</i>
                  <span className="createtime">{parseTime(item.createAt)}</span>
                </div>
              </div>
              <div
                className="news-item-remove"
                onClick={() => {
                  removeArticle(index)
                }}
              >
                移除
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
