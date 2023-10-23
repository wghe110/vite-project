import api from '@/apis/preload'
import dealWorker from '@/utils/worker/car-tree.js?worker'
import store from '@/store/index'

// 加载字典
const loadDicts = () => {
  return new Promise((resolve, reject) => {
    const params = {
      type: 1
    }
    api.getCarTree(params).then(res => {
      const { result } = res
      resolve(result)

      // 处理数据
      const msg = JSON.stringify(result)
      const worker = new dealWorker()
      worker.postMessage(msg)
      worker.onmessage = e => {
        const obj = JSON.parse(e.data)
        const { tree, patTree } = obj
        store.commit('dict/setCarTree', tree)
        store.commit('dict/setPatCarTree', patTree)
      }
    })
  })
}

export default loadDicts