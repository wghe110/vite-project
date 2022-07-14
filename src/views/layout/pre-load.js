import store from '@/store/index'
import router from '@/router/index'

// 加载用户信息
const loadUserInfo = () => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 获取用户信息，并保存到vuex里面（如果失败请用ui组件进行提示） TODO
        resolve()
      }, 1500)
  }) 
}

// 加载菜单列表
const loadMenus = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 获取菜单，注册动态路由（如果失败请用ui组件进行提示） TODO
      resolve()
    }, 2500)
  }) 
}

// 加载字典
const  loadDicts = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 获取字典信息，并保存到vuex的modules/dict里面（如果失败请用ui组件进行提示） TODO
      resolve()
    }, 3500)
  }) 
}

// 判断是否显示左侧菜单/顶部菜单
const initHeaderAndAside = (router) => {
  const {
    query: { hideHeader, hideAside },
  } = router;
  if (hideHeader) store.commit("setShowHeader", false);
  if (hideAside) store.commit("setShowAside", false);
}

// 判断url是否携带token，如果有，写入本地
const initToken = (router) => {
  const { query: {token } } = router
  if(token) localStorage.setItem('token', token)
}

export {
  loadUserInfo,
  loadMenus,
  loadDicts,
  initHeaderAndAside,
  initToken,
}