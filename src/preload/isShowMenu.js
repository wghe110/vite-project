import globalStore from '@/store/global'

const initHeaderAndAside = () => {
  const store = globalStore()
  // 判断是否在iframe中，如果是则隐藏菜单
  if (window.self === window.top) {
    store.showMenu = true;
  } else {
    store.showMenu = false;
  }
}

export default initHeaderAndAside