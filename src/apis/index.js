import axios from 'axios'
import { Message } from 'element-ui';
import router from '@/router/index'

const instance = axios.create({
  timeout: 25000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('token')
  return config;
});

// 响应拦截器
instance.interceptors.response.use((response) => {
  const { status, data } = response
  if (status === 200 || status === 201) {
    return Promise.resolve(data)
  }
  return Promise.reject(response);
}, (error) => {
  const { response = {} } = error;

  if (response.status === 401) {
    const isLogin = location.hash === '#/login'
    if (isLogin) return Promise.reject(response);
    Message.error('登录失效')
    router.push('/login')
  }
  if (error.message.indexOf('timeout') != -1) {
    Message.error('请求超时')
  }

  return Promise.reject(response);
})

export default instance;