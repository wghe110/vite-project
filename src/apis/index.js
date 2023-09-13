import axios from 'axios'
import { Message } from 'element-ui';

const instance = axios.create({
  timeout: 25000,
})

// 请求头部添加token
const token = localStorage.getItem('token')
instance.defaults.headers.common['Authorization'] = token;

// 响应拦截器
instance.interceptors.response.use((response) => {
  const { status, data } = response
  if (status === 200) {
    return Promise.resolve(data)
  }
  return Promise.reject(response);
}, (error) => {
  const { response = {} } = error;

  if (response.status === 401) {
    const isLogin = location.hash === '#/login'
    if (isLogin) return Promise.reject(response);
    // TODO
    Message.error('登录失效')
  }
  if (error.message.indexOf('timeout') != -1) {
    Message.error('请求超时')
  }

  return Promise.reject(response);
})

export default instance;