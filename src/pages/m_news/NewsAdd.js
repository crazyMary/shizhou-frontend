import { Input, Editor, Img } from '@components'
import { uploadImg, picUrl, _uploadImg } from '@shared/utils'
import { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { initForm } from './index'
const ArticleImg = Img.Default

function NewsAdd(props, ref) {
  const [form, setForm] = useState(initForm)
  useImperativeHandle(ref, () => form)
  // 上传图片
  async function uploadImg(e) {
    const [file] = e.target.files
    const res = await _uploadImg(file)
    formChange('imgSrc', res.path)
  }
  // 编辑表单
  function formChange(type, value) {
    setForm({
      ...ref.current,
      [type]: value
    })
  }
  return (
    <div id="newsAdd">
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
            height={500}
            contentChange={content => formChange('content', content)}
          />
        </div>
      </div>
    </div>
  )
}

export default forwardRef(NewsAdd)
