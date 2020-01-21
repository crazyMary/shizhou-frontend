import WangEditor from 'wangeditor'
import { useEffect, useMemo } from 'react'
import { picUrl, _uploadImg } from '@shared/utils'

export default function(props) {
  const ID = useMemo(() => `editor_${Date.now()}`)
  useEffect(
    function() {
      const editor = new WangEditor(`#${ID}`)
      editor.customConfig.pasteFilterStyle = false
      editor.customConfig.onchange = function(html) {
        props.contentChange && props.contentChange(html)
      }
      editor.customConfig.customUploadImg = async function(files, insert) {
        const res = await _uploadImg(files[0])
        insert(picUrl(res.path))
      }
      editor.create()
      editor.txt.html(props.content)
      editor.$textContainerElem[0].style.height = props.height + 'px'
    },
    [props.content]
  )
  return <div id={ID}></div>
}
