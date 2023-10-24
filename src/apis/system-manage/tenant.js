import instance from '../index'
import qs from 'qs'

export default {
  // 获取列表
  getList: (params) => instance.get('/api/cscpTenants', { params }),
  // 校验租户账户
  validTenantAccount: (params) => instance.get('/api/cscpTenant/checkTenantAccountExist', { params }),
  // 新增租户
  addTenant: (params) => instance.post('/api/tenant/insertTenant', params),
  // 删除租户
  deleteTenant: (id) => instance.post('/api/tenant/cscpTenants/' + id),
  // 批量删除租户
  batchDeleteTenant: (params) => instance.post('/api/tenant/cscpTenants/delAll', qs.stringify(params), {
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded'
    }
  }),
  // 更改租户账户状态
  changeStatus: (params) => instance.post('/api/cscpTenants/changeStatus', params),
  // 获取租户账户详情
  getTenantInfo: (id) => instance.get('/api/cscpTenants/' + id),
  // 获取租户菜单
  getTenantMenus: (id) => instance.get('/api/cscpTenants/getMenu/' + id),
  // 更新租户
  updateTenant: (params) => instance.post('/api/tenant/updateTenant', params),
  // 获取菜单列表
  getMenus: () => instance.get('/api/system/tenant/cscpAllMenus'),
}