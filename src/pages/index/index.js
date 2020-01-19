import './index.scss'
import storage from '@shared/storage'
import { useEffect, useState } from 'react'
import { Input, Button, Toast, Layout } from '@components'
import { Validator } from '@shared/utils'

function App() {
  const [form, setForm] = useState({ username: '', password: '' })
  // 登录
  function login() {
    const validator = new Validator(form)
    validator
      .add(form.username, 'isNonEmpty', '用户名不能为空')
      .add(form.password, 'isNonEmpty', '密码不能为空')
      .check()
      .then(async res => {
        const userInfo = await API.login(res)
        storage
          .setItem('token', userInfo.token)
          .setItem('refreshToken', userInfo.refreshToken)
          .setItem('userInfo', JSON.stringify(userInfo))
        location.href = '/m_news.html'
      })
      .catch(msg => Toast.info(msg))
  }
  // 改变表单内容
  function formChange(e, type) {
    setForm({
      ...form,
      [type]: e.target.value
    })
  }
  return (
    <Layout id="LoginPage">
      <div className="bg"></div>
      <div className="form-wrapper">
        <div className="form">
          <div className="form-title">hello!&ensp;欢迎登录</div>
          <div className="form-item">
            <Input
              placeholder="请输入用户名"
              value={form.username}
              onChange={e => formChange(e, 'username')}
            ></Input>
          </div>
          <div className="form-item">
            <Input
              placeholder="请输入密码"
              type="password"
              value={form.password}
              onChange={e => formChange(e, 'password')}
            ></Input>
          </div>
          <div className="form-btn-wrapper">
            <Button type="primary" onClick={login}>
              登录
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
RenderDOM(<App />, document.querySelector('#app'))
