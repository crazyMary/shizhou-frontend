import { useState, useEffect, useRef } from 'react'
const placeholders = Object.create(null)
const cacheImg = {}

function ImgComponentCreator(placeholder) {
  function ImgComponent({
    src,
    children,
    contain,
    style = {},
    download = true,
    forwardRef,
    ...rest
  }) {
    const imgRef = forwardRef || useRef(null)
    const immediateImg = (cacheImg[src] && download) || !src
    const opacity = immediateImg ? '1' : '0.7'
    const [link, setLink] = useState(immediateImg ? src : placeholder)
    useEffect(() => {
      if ((!cacheImg[src] && src && download) || download) {
        const image = new Image()
        image.onload = () => {
          setLink(src)
          cacheImg[src] = true
          imgRef.current.style.opacity = '1'
        }
        image.src = src
      }
      if (!src) {
        setLink(placeholder)
      }
    }, [download, src])
    return (
      <div
        ref={imgRef}
        style={{
          backgroundSize: contain ? 'contain' : 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundImage: `url(${link})`,
          transition: 'opacity 2s',
          height: '100%',
          opacity,
          ...style
        }}
        {...rest}
      >
        {children}
      </div>
    )
  }
  return React.forwardRef((props, ref) => {
    return <ImgComponent {...props} forwardRef={ref} />
  })
}

const Img = new Proxy(
  {},
  {
    get(target, key, receiver) {
      if (key in placeholders) {
        return ImgComponentCreator(placeholders[key])
      }
      if (process.env.NODE_ENV === 'development') {
        console.error(`using default placehoder instead of ${key}`)
      }
      return ImgComponentCreator(placeholders['Default'])
    },
    set(target, key, value) {
      if (placeholders[key]) {
        console.error(`${key} has already been decleared`)
        return true
      }
      return (placeholders[key] = value)
    }
  }
)

Img.Default =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVAAAADwAgMAAAAr7dQQAAAACVBMVEX7+/v19fX4+PjzX1BZAAAChElEQVR42u3aQWrjMBTGcVeQhb33EbzILczsZpdFnzBZaTNg5hS6hPZmwDD0lIU2lqJEYOn5maTt998Fyq80cuJXSxVCCCGEEEIIIYTQD+ltvanUbGi9v4WmcpSRKUNryulchs6UlS1C3Q6ooryM3FsaGkrQYyaqS9BuD7SlzAQXP2T3QPsyVE9rl91ciBKRtquXSDl6qtZ6KUdNtZYqRPN+HChQoN8ZbRyN4qgjokkODePfIIeGu7UWRMM9cBJFlZ9vBNFaHA0DkBZEwwAkiroLaiVRumQEUbUrOgqiLws6PDtaL+gr0KdGv84lFT5Rz/7Zr74OyviSZtxO3qbt6PHm2p+Jps1o4y9T/3KUGibM1cMVLTX22OvJym5Gaz9L+F/Rb0bVMp/6FzRuQMN6axs9BBu2o2rWU/wQ7LwVjTvQR4JomAF7UdR9okYSVRf0JIrSZ2dBNNxbJdHDglpBtFvQXhBtF9QIom5BBzlU0ZKWQxvyWTG0DmgvhnYBNWJoG9BBDHUB1VKoopC2fFTRGC1+aAM6k44WP2TYqCIik977GNhoHY3QrRx6Tm9TaDY6Rw86KMoy0XjIaWLUMFF1M/BFDUy0joacowx68EuS2PjSTHSO/odwFMdDVTSPKLpp4qCeOaVRw0H9cg/prdSBhR7811xyK1Vz0LDcNr2VykGVi25I7g61HPTmhnSXYaBhZXR6H31koB35bHIf/ZWBtuQzyX10zUBdhHZ0Xzn6K/5GciLob7rKKhJB/9BV2kmgdwEFChToM6Hu+6F2h+Ni9PAzaMdc9OHn+lQmah5+VjLzVKcuQ2vGWyr090+FaJOh/t/h9PE/WyGEEEIIIYQQQgihH9A7BEqpfs2+Aj4AAAAASUVORK5CYII='

export default Img
