import './index.scss'

export default function({ type = 'text', ...rest }) {
  return type == 'textarea' ? (
    <textarea className="mk-textarea mk-input" rows="3" {...rest} />
  ) : (
    <input className="mk-input" type={type} {...rest} />
  )
}
