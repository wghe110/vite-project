import request from '@/apis/dict'
import globalStore from '@/store/global'
import { ElMessage } from 'element-plus'

// 加载字典
const loadDicts = () => {

  const store = globalStore()

  return new Promise((resolve, reject) => {
    request.listDict().then(res => {
      if (res && res.length) {
        res.forEach(item => {
          const { key, childList } = item
          if (childList && childList.length) {
            const opt = childList.map(optItem => ({
              value: optItem.key,
              text: optItem.value,
              label: optItem.value
            }))

            store.dicts.set(key, opt)
          }
        })
      }
      resolve()
    }, () => {
      ElMessage.error('获取字典列表失败')
      reject()
    })
  })
}

export default loadDicts