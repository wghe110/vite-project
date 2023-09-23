import router from './index'
import store from '../store/index'

import initToken from "./preload/init-token";
import initHeaderAndAside from "./preload/init-header-aside";

import loadUserInfo from "./preload/load-user-info";
import loadDicts from "./preload/dict";
import loadMenus from "./preload/init-menus";

const aIgnorePaths = ['/login', '/change-pwd']

router.beforeEach((to, from, next) => {
  const { path } = to
  if (aIgnorePaths.includes(path)) return next()
  if (store.state.inited) return next()
  initToken(to)
  initHeaderAndAside(to)

  Promise.all([loadUserInfo(), loadDicts(), loadMenus()])
    .then(() => {
      store.commit('setInited', true)
      next()
    })
})