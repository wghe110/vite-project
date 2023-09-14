import instance from './index'

export default {
  // 获取规则
  getPwdRule: (params) => instance.get('/api/system/cscpUserPasswordRule', { params }),
  updatePwd: (data) => instance.put('/api/system/cscpUserPassword', data),
}