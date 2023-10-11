import instance from './index'
import qs from 'qs'

export default {
  // 获取角色列表
  getRoleList: (params) => instance.get('/api/system/cscpRolessByCriteria', { params }),
  // 获取菜单列表
  getMenuList: (params) => instance.post('/api/system/menu/queryByRoleId', qs.stringify(params), {
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded'
    }
  }),
  // 校验角色名是否重复
  validName: (params) => instance.get('/api/validation/role', { params }),
  // 创建角色
  cscpRoless: (params) => instance.post('/api/system/cscpRoless', params),
  // 更新权限
  updateAuthority: (params) => instance.post('/api/system/menu/save', qs.stringify(params), {
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded'
    }
  }),
  // 获取角色详情
  getRoleDetail: (id) => instance.get('/api/system/cscpRoless/' + id),
  // 更新角色
  updateRole: (params) => instance.post('/api/system/updateCscpRoles', params),
}