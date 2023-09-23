// 加载字典
const loadDicts = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 获取字典信息，并保存到vuex的modules/dict里面（如果失败请用ui组件进行提示） TODO
      resolve()
    }, 2000)
  })
}

export default loadDicts