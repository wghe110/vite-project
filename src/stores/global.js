import { defineStore } from 'pinia'
import request from '@/apis/index'

const globalStore = defineStore('global', {
  state() {
    return {
      showHeader: true,
      showAside: true,
      dicts: {}
    }
  },
  actions: {
    // 获取字典
    getDict(dictType) {
      if (this.dicts[dictType]) return Promise.resolve(this.dicts[dictType])

      const _this = this;
      return request.get(`/bs/dict/getDictListByType?dictType=${dictType}`).then((res) => {
        _this.dicts[dictType] = res || []
        return res;
      })
    }
  }
})

export default globalStore