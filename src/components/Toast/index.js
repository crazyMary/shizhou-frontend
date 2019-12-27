import './index.scss'
const icos = {
  success: '//ihos-images.myweimai.com/051835653097ac9686de201d8e30da7d.png',
  error: '//ihos-images.myweimai.com/f45e700f72c00456991dd40837a93394.png',
  info: '//ihos-images.myweimai.com/502bf237ce480843f7e12650c5fdda4e.svg'
}
function ToaseComponent(props) {
  return (
    <div className="mk-toast">
      <img width="14" src={props.ico} alt="" />
      <span className="mk-toast-text">{props.text}</span>
    </div>
  )
}
function toast(type) {
  const ico = icos[type]
  return function(text) {
    const toastContainer = document.createElement('div')
    RenderDOM(<ToaseComponent ico={ico} text={text} />, toastContainer)
    document.body.appendChild(toastContainer)
    setTimeout(() => {
      document.body.removeChild(toastContainer)
    }, 4 * 1e3)
  }
}

const Toast = {
  info: toast('info'),
  error: toast('error'),
  success: toast('success')
}

export default Toast
