import instance from './index'

export default {
  // get
  getUserInfo: (params) => instance.get('/api/uc/openApi/user/get', { params }),
  loginOut: (params) => instance.post('/api/uc/openApi/user/logout', params),
}