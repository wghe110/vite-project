import instance from './index'
import qs from 'qs'

export default {
  // get
  getDemo: (params) => instance.get('xxx/xxx/xxx', { params }),
  //post
  postDemo: (params) => instance.post('xxx/xxxxx/xxxx', params),
  //post application/x-www-form-urlencoded
  postXDemo: (params) => instance.post('xxx/xxxxx/xxxx', qs.stringify(params), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }),
}