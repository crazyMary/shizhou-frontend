import './index.scss'
import Button, { ButtonGroup } from '../Button'

function ModalComponent(props) {
  function confirmModal() {
    props.onOk && props.onOk()
  }
  return (
    <>
      <div className="mk-modal-header">
        <div className="title">{props.title}</div>
        <img
          src="//ihos-images.myweimai.com/6744dc6c163f1fecb875b6c4e99551de.svg"
          alt=""
          width="16"
        />
      </div>
      <div className="mk-modal-body">{props.body}</div>
      <div className="mk-modal-footer">
        <ButtonGroup>
          <Button onClick={props.removeModal}>取消</Button>
          <Button type="primary" onClick={confirmModal}>
            确定
          </Button>
        </ButtonGroup>
      </div>
    </>
  )
}

function Modal(props) {
  const mask = document.createElement('div')
  mask.className = 'mk-modal'
  RenderDOM(<ModalComponent {...props} removeModal={removeModal} />, mask)
  document.body.appendChild(mask)
  function removeModal() {
    props.onClose && props.onClose()
    mask.classList.add('fade-out')
    setTimeout(() => {
      document.body.removeChild(mask)
    }, 200)
  }
  return {
    close: removeModal
  }
}

export default Modal
