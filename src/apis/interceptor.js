import { getHostFn } from './config'
import confirmToken from '@/utils/confirm-token'

uni.addInterceptor('request', {
  invoke(args) {
    // request 触发前拼接 url 
    const host = getHostFn(args.url)
    args.url = host + args.url
  },
  success(args) {
    // 请求成功后，根据状态码进行统一报错处理
    const { data: { code, message, msg } } = args;
    if (code !== 200 && code !== 0) {
      //token失效
      if (code === 9100) {
        confirmToken()
      } else {
        // 请求错误,抛出错误信息
        uni.showToast({
          title: message || msg || '请求错误',
          icon: 'none',
          duration: 2500
        })
      }
    }
  },
  fail(err) {
    // console.log('interceptor-fail', err)
  },
  complete(res) {
    // console.log('interceptor-complete', res)
  }
})
