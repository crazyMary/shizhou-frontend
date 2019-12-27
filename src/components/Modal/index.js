import './index.scss'
import Button, { ButtonGroup } from '../Button'

function ModalComponent(props) {
  function confirmModal() {
    props.onOk && props.onOk()
  }
  return (
    <div className="mk-modal">
      <div className="mk-modal-header">
        <div className="mk-modal-header-title">{props.title}</div>
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
    </div>
  )
}

function Modal(props) {
  const mask = document.createElement('div')
  mask.className = 'mk-modal-mask'
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
