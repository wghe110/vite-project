
import api from '@/apis/user'
import { ElMessage } from 'element-plus'
import globalStore from '@/store/global'

// 加载用户信息
const loadUserInfo = () => {
  const store = globalStore()

  return new Promise((resolve, reject) => {
    api.getUserInfo().then(res => {
      store.userInfo = res || {}
      resolve()
    }, () => {
      ElMessage.error('获取用户信息失败')
      reject()
    })
  })
}

export default loadUserInfo