import instance from './index'

export default {
  // 获取菜单
  getMenus: (params) => instance.get('/api/system/cscpMenus', { params })
}