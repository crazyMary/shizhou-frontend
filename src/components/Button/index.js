import './index.scss'

export default function({ children, type = 'default', ...rest }) {
  return (
    <div
      className={Kls('mk-button', { 'mk-button-primary': type == 'primary' })}
      {...rest}
    >
      {children}
    </div>
  )
}

export function ButtonGroup(props) {
  return <div className="mk-button-group">{props.children}</div>
}
