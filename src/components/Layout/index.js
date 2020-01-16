import '@shared/global.scss'
import './index.scss'
import { getUserInfo } from '@shared/utils'
import storage from '@shared/storage'
storage.prefix = `sz-${ENV}`

export default function Layout(props) {
  return (
    <div id={props.id} className="wrapper">
      {props.children}
    </div>
  )
}

Layout.Manage = function(props) {
  return (
    <Layout id={props.id}>
      <Layout.Manage.Header />
      <Layout.Manage.Main>{props.children}</Layout.Manage.Main>
    </Layout>
  )
}

Layout.Manage.Header = function() {
  const userInfo = getUserInfo()
  const navs = [
    { title: '新闻动态', value: 'm_news' },
    { title: '团队成员', value: 'm_staff' }
  ]
  const { pathname } = MK_URL.parse.url(location.href)
  // 退出
  function loginOut() {
    localStorage.clear()
    location.href = '/'
  }
  return (
    <header id="manageHeader">
      <div className="title">史家门后台管理</div>
      <div className="navs">
        {navs.map(({ value, title }) => (
          <a
            key={value}
            className={Kls({ active: pathname.includes(value) })}
            href={'/' + value + '.html'}
          >
            {title}
          </a>
        ))}
      </div>
      <div className="user">
        <span className="name">{userInfo.nickname}</span>
        <span className="loginout" onClick={loginOut}>
          退出
        </span>
      </div>
    </header>
  )
}

Layout.Manage.Main = function(props) {
  return <main id="manageMain">{props.children}</main>
}
