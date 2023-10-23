import instance from '../index'
import qs from 'qs'

export default {
  // 获取系统配置
  getSysConfig: () => instance.get('/api/system/config/getSysConfigContent'),
  // 获取终端选型候选项
  getTerminalOpts: (params) => instance.get('/api/dic/cscpHxDicItems/getCscpBasicHxItemCode', { params }),
  // 更新系统配置
  updateSys: (params) => instance.post('/api/system/config/addOrUpdate', params),
}