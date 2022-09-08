// 上滑加载更多的逻辑
import { ref, watch } from 'vue'

export default (props) => {
  const contentText = { contentdown: "点击或上拉显示更多", contentrefresh: "正在加载...", contentnomore: "--到底了--" }
  const status = ref('more')

  watch(() => props.isFinished, (val) => {
    if (val) {
      status.value = 'no-more'
    } else {
      status.value = 'more'
    }
  })

  const loadFn = () => {
    if (props.isFinished) return

    if (status.value === 'more') {
      if (props.load && typeof props.load === 'function') {
        status.value = 'loading'
        props.load().finally(() => {
          if (props.isFinished) {
            status.value = 'no-more'
          } else {
            status.value = 'more'
          }
        })
      }
    }
  }

  return {
    contentText,
    status,
    loadFn
  }
}
