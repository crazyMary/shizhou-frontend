import WangEditor from 'wangeditor'
import { useEffect, useMemo } from 'react'
export default function(props) {
  const ID = useMemo(() => `editor_${Date.now()}`)
  useEffect(
    function() {
      const editor = new WangEditor(`#${ID}`)
      editor.customConfig.pasteFilterStyle = false
      editor.customConfig.onchange = function(html) {
        props.contentChange && props.contentChange(html)
      }
      editor.create()
      editor.txt.html(props.content)
      editor.$textContainerElem[0].style.height = props.height + 'px'
    },
    [props.content]
  )
  return <div id={ID}></div>
}
