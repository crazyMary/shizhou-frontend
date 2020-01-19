import { Input, Editor, Img } from '@components'
import { uploadImg } from '@shared/utils'
const ArticleImg = Img.Default

export default function() {
  async function addImg(e) {
    const [file] = e.target.files
    if (!file) return
    const fd = new FormData()
    fd.append('file', file)
    fd.append('name', 'name')
    const res = await API.uploadImg(fd)
    return res
  }
  return (
    <div id="newsAdd">
      <div className="news-form-item">
        <div className="title">新闻标题</div>
        <div className="input">
          <Input placeholder="输入标题"></Input>
        </div>
      </div>
      <div className="news-form-item">
        <div className="title">新闻封面</div>
        <div className="input">
          <label>
            <ArticleImg />
            <Input type="file" onChange={addImg} accept="image/*"></Input>
          </label>
        </div>
      </div>
      <div className="news-form-item">
        <div className="title">新闻内容</div>
        <div className="input">
          <Editor />
        </div>
      </div>
    </div>
  )
}
