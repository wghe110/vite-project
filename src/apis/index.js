import axios from 'axios'

const instance = axios.create({
  timeout: 25000,
})
// 请求头部添加token
const token = localStorage.getItem('token')
instance.defaults.headers.common['Authorization'] = token;

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  const { status, data } = response
  if(status === 200) {
    // 一般后台会返回code和message在data里面，通过code来判断逻辑错误
    if(data.code === 200) {
      // 请求成功
      return Promise.resolve(data.data)
    } else if(data.code === 1) {
      // token失效，跳转到登录页 TODO
      console.log('登录失效，请跳转到登录页')
    } else {
      // 逻辑错误，TODO提示一下message
      return Promise.reject(response)
    }
  } else {
    //后台返回错误 TODO 提示一下
    return Promise.reject(response);
  }
}, function(error) {
  const { response = {}, code, message } = error;
  
  if (response.status === 401) {
    // 从网关拦截掉的请求,登录失效 TODO
    console.log('登录失效，请跳转到登录页')
  } else if(code === 'ECONNABORTED' && message.indexOf('timeout') != -1) {
    // 请求超时
    console.log('请求超时')
  }

  return Promise.reject(error);
})

export default instance;