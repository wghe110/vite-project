import instance from './index'

export default {
  // get
  listDict: (params) => instance.get('/api/9x/dict/listDict', { params }),
}