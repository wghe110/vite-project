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
  })
}