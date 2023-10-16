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
}