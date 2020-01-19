import WangEditor from 'wangeditor'
import { useEffect } from 'react'

export default function() {
  useEffect(function() {
    const editor = new WangEditor('#editor')
    editor.customConfig.pasteFilterStyle = false
    editor.create()
    editor.$textContainerElem[0].style.height = '500px'
  }, [])
  return <div id="editor"></div>
}
