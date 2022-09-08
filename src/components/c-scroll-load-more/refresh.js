import { ref } from "vue"

export default (props) => {
  const triggered = ref(false)
  let _freshing = false

  const onPulling = (e) => {
    console.log('onPulling', e)
    if (triggered.value) return;
    triggered.value = true;
  }

  // 下拉刷新
  const onRefresh = () => {
    console.log('onRefresh')
    if (_freshing) return;
    _freshing = true;
    if (props.refresh && typeof props.refresh === 'function') {
      props.refresh().finally(() => {
        triggered.value = false;
        _freshing = false;
      })
    }
  }

  const onRestore = () => {
    triggered.value = false; // 需要重置
    console.log('onRestore')
  }

  const onAbort = () => {
    console.log('onAbort')
  }

  return {
    triggered,
    onPulling,
    onRefresh,
    onRestore,
    onAbort
  }
}