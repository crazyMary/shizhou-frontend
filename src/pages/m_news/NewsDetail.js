import { Input, Editor, Img, Button } from '@components'
import { ButtonGroup } from '@components/Button'
import { uploadImg, picUrl, _uploadImg } from '@shared/utils'
import { useState, useEffect } from 'react'
const ArticleImg = Img.Default

export default function NewsDetail(props) {
  const [form, setForm] = useState(props.form)
  useEffect(() => {
    setForm(props.form)
  }, [props.form])
  // 上传图片
  async function uploadImg(e) {
    const res = await _uploadImg(e)
    formChange('imgSrc', res.path)
  }
  // 编辑表单
  function formChange(type, value) {
    setForm({
      ...form,
      [type]: value
    })
  }
  // 更新文章
  async function updateArticle() {
    await API.updateArticle(form)
    props.updateList()
  }
  return (
    <div id="newsDetail" className="news-detail">
      <div className="news-detail-top">新闻详情</div>
      <div className="news-form-item">
        <div className="title">新闻标题</div>
        <div className="input">
          <Input
            placeholder="输入标题"
            value={form.title}
            onChange={e => formChange('title', e.target.value)}
          ></Input>
        </div>
      </div>
      <div className="news-form-item">
        <div className="title">新闻关键词</div>
        <div className="input">
          <Input
            placeholder="输入关键词"
            value={form.keywords}
            onChange={e => formChange('keywords', e.target.value)}
          ></Input>
        </div>
      </div>
      <div className="news-form-item">
        <div className="title">新闻封面</div>
        <div className="input">
          <label>
            <ArticleImg src={picUrl(form.imgSrc)} />
            <Input type="file" onChange={uploadImg} accept="image/*"></Input>
          </label>
        </div>
      </div>
      <div className="news-form-item">
        <div className="title">新闻内容</div>
        <div className="input">
          <Editor
            height={400}
            content={form.content}
            contentChange={content => formChange('content', content)}
          />
        </div>
      </div>
      <div>
        <ButtonGroup>
          <Button onClick={() => setForm(props.form)}>恢复</Button>
          <Button type="primary" onClick={updateArticle}>
            更改
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}
