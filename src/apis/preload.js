import instance from './index'

export default {
  // 获取菜单
  getMenus: (params) => instance.get('/api/system/cscpMenus', { params }),
  // 获取车辆树
  getCarTree: (params) => instance.get('/api/system/car/treeList', { params }),
}