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
  // 判断角色是否被使用
  validRoleUsed: (id) => instance.get('/api/system/cscpRoleUsers/' + id),
  // 删除角色
  deleteRole: (id) => instance.post('/api/system/cscpRoless/' + id),
  // 获取组织树
  getOrgTree: () => instance.get('/api/system/car/dept/treeselect'),
  // 查询用户列表
  userList: (params) => instance.get('/api/sys/user/cscpUserDetailsOr', { params }),
  // 校验用户名是否重复
  validUserName: (params) => instance.get('/api/system/cscpUserExistByUsername', { params }),
  // 创建用户
  createUser: (params) => instance.post('/api/system/cscpUserDetails', params),
  // 获取用户详情
  getUserDetail: (params) => instance.get('/api/system/cscpUserDetailsByUserId', { params }),
  // 更新用户
  updateUser: (params) => instance.post('/api/system/updateCscpUserDetail/0', params),
  // 删除用户
  deleteUser: (userId) => instance.post('/api/system/cscpUsers/' + userId),
  // 修改密码
  updatePwd: (params) => instance.post('api/tenant/updateCscpUserPwd', params),
  // 查询操作日志列表
  getActionLogList: (params) => instance.get('/api/system/cscpLogOperationsByCriteria', { params }),
  // 查询登录日志列表
  getLoginLogList: (params) => instance.get('/api/system/cscpLogLoginsByCriteria', { params }),
  // 查询基础字典列表
  getDictList: (params) => instance.get('/api/dic/cscpHxDics', { params }),
  // 校验字典编码是否存在
  validDictCode: (params) => instance.post('/api/dic/cscpHxDics/checkCscpHxDicCode', params),
  // 校验字典名称是否存在
  validDictName: (params) => instance.post('/api/dic/cscpHxDics/checkCscpHxDicName', params),
  // 新建字典
  createDict: (params) => instance.post('/api/dic/cscpHxDics', params),
  // 删除字典
  deleteDict: (id) => instance.post('/api/dic/cscpHxDics/' + id),
  // 批量删除字典
  deleteDictAll: (params) => instance.post('/api/dic/cscpHxDics/delAll', qs.stringify(params), {
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded'
    }
  }),
  // 查询字典详情
  getDictInfo: (id) => instance.get('/api/dic/cscpHxDics/' + id),
  // 查询字典项列表
  getDictItemList: (params) => instance.get('/api/dic/cscpHxDicItems', { params }),
  // 校验字典项编码
  validDicItemCode: (params) => instance.post('/api/dic/cscpHxDicItems/checkCscpHxItemCode', params),
  // 新建字典项
  createDictItem: (params) => instance.post('/api/dic/cscpHxDicItems', params),
  // 编辑字典项
  updateDictItem: (params) => instance.post('/api/dic/updateCscpHxDicItem', params),
  // 删除字典项
  deleteDictItem: (id) => instance.post('/api/dic/cscpHxDicItems/' + id),
  // 批量删除字典项
  deleteDictItemAll: (params) => instance.post('/api/dic/cscpHxDicItems/delAll', qs.stringify(params), {
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded'
    }
  }),
}