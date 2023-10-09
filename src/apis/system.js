import instance from './index'

export default {
  // 获取角色列表
  getRoleList: (params) => instance.get('/api/system/cscpRolessByCriteria', { params })
}