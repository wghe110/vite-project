import instance from '../index'
import qs from 'qs'

export default {
  // 报警自动处理设置-列表
  getAutoAlarmList: (params) => instance.post('/api/risk/autoAlarm/list', params),
  // 报警自动处理设置-已选择
  getAutoAlarmShow: (params) => instance.post('/api/risk/autoAlarm/show', params),
  // 报警自动处理设置-新增
  autoAlarmAdd: (params) => instance.post('/api/risk/autoAlarm/add', params),
  // 报警自动处理设置-更新
  autoAlarmUpdata: (params) => instance.post('/api/risk/autoAlarm/update', params),
  // 报警自动处理设置-删除
  autoAlarmDelete: (params) => instance.post('/api/risk/autoAlarm/delete', params),

  // 风控坐席人员-列表
  getSeatList: (params) => instance.post('/api/risk/controlSeat/list', params),
  // 风控坐席人员-新增
  seatAdd: (params) => instance.post('/api/risk/controlSeat/add', params),
  // 风控坐席人员-已选择
  getSeatShow: (params) => instance.post('/api/risk/controlSeat/show', params),
  // 风控坐席人员-删除
  seatDelete: (params) => instance.post('/api/risk/controlSeat/delete', params),

  // 报警级别设置-字典
  getAlarmDict: (params) => instance.get('/api/dic/cscpHxDicItems/getCscpBasicHxItemCode', { params }),
  // 报警级别设置-列表
  getAlarmList: (params) => instance.post('/api/risk/alarmLevel/list', params),
  // 报警级别设置-已选择
  getAlarmShow: (params) => instance.post('/api/risk/alarmLevel/show', params),
  // 报警级别设置-新增
  alarmAdd: (params) => instance.post('/api/risk/alarmLevel/add', params),
  // 报警级别设置-删除
  alarmDelete: (params) => instance.post('/api/risk/alarmLevel/delete', params),
}