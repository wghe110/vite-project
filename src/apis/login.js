import instance from './index'

export default {
  // 获取验证码
  getCode: (params) => instance.get('/api/catpcha/digitalCaptcha', { params }),
  login: (data, headers) => instance.post('/api/system/login', data, {
    headers
  })
}