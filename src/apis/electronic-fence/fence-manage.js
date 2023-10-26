import instance from '../index'
import qs from 'qs'

export default {
  // 获取告警类型字典
  getWarmTypeDict: (params) => instance.get('/api/dic/cscpHxDicItems/getCscpBasicHxItemCode', { params }),
}