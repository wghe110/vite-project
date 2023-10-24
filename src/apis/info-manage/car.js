import instance from '../index'
import qs from 'qs'

export default {
  // 字典
  getDict: (params) => instance.get('/api/dic/cscpHxDicItems/getCscpBasicHxItemCode', { params }),
  // 获取车辆列表
  getList: (params) => instance.get('/api/system/car/list', { params }),
  // 获取组织树
  getOrgTree: () => instance.get('/api/system/car/dept/findDeptTreeList'),
}