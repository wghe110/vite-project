import axios from 'axios'
import { ElMessage } from 'element-plus'

const instance = axios.create({
  timeout: 25000,
})
// 请求头部添加token
const token = localStorage.getItem('token')
instance.defaults.headers.common['Authorization'] = token;

const LoginFailFn = () => {
  ElMessage.error('登录失效，请跳转到登录页')
  if (import.meta.env.PROD) {
    // window.location.href = 'http://10.32.132.86:8080/#/login'
  }
}

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  const { status, data: { code, data, msg } } = response
  if (status === 200) {
    if (code === 0) return Promise.resolve(data)
    if (code === 1 || code === 9100) return LoginFailFn()
    // 报错
    ElMessage.error(msg || '请求报错')
  }
}, function (error) {
  const { response = {}, code, message } = error;

  if (response.status === 401) return LoginFailFn()
  if (code === 'ECONNABORTED' && message.indexOf('timeout') != -1) ElMessage.error('请求超时')

  return Promise.reject(error);
})

export default instance;