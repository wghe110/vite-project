import router from './index'
import store from '../store/index'

import initToken from "./preload/init-token";
import initHeaderAndAside from "./preload/init-header-aside";
import skeleton from './preload/skeleton'

import loadUserInfo from "./preload/load-user-info";
import loadDicts from "./preload/dict";
import loadMenus from "./preload/init-menus";

const aIgnorePaths = ['/login', '/change-pwd', 'skeleton']

router.beforeEach((to, from, next) => {
  const { path } = to

  // 设置激活菜单
  store.commit('setActivePath', path)

  skeleton.hide()

  if (aIgnorePaths.includes(path)) return next()
  if (store.state.inited) return next()

  skeleton.show()
  // 预加载数据
  initToken(to)
  initHeaderAndAside(to)

  Promise.all([loadUserInfo(), loadDicts(), loadMenus()])
    .then(() => {
      store.commit('setInited', true)
      next({ ...to })
    }).finally(() => {
      skeleton.hide()
    })
})