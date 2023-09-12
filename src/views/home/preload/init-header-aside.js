import store from '@/store/index'

// 判断是否显示左侧菜单/顶部菜单
const initHeaderAndAside = (router) => {
  const {
    query: { hideHeader, hideAside },
  } = router;
  if (hideHeader) store.commit("setShowHeader", false);
  if (hideAside) store.commit("setShowAside", false);
}

export default initHeaderAndAside;