import router from '@/router/index'

// 加载用户信息
const loadUserInfo = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 获取用户信息，并保存到vuex里面（如果失败请用ui组件进行提示） TODO
      resolve()
    }, 500)
  })
}

// 加载菜单列表
const loadMenus = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 获取菜单，注册动态路由（如果失败请用ui组件进行提示） TODO
      resolve()
    }, 1500)
  })
}

// 加载字典
const loadDicts = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 获取字典信息，并保存到vuex的modules/dict里面（如果失败请用ui组件进行提示） TODO
      resolve()
    }, 2000)
  })
}

// 判断是否显示左侧菜单/顶部菜单
const initHeaderAndAside = (router) => {
  const {
    query: { hideHeader, hideAside },
  } = router;
  // if (hideHeader) store.commit("setShowHeader", false);
  // if (hideAside) store.commit("setShowAside", false);
}

// 判断url是否携带token，如果有，写入本地
const initToken = (router) => {
  const { query: { token } } = router
  if (token) localStorage.setItem('token', token)
}

// loading
const createLoading = () => {
  const ele = document.createElement('div')
  ele.setAttribute('style', `
    display: none;
    align-items: center;
    position: fixed;
    left: 50%;
    top: 10px;
    background: #fff;
    border-radius: 4px;
    padding: 6px 14px;
  `)

  const img = document.createElement('img');
  img.src = '/images/loading.gif'
  img.setAttribute('style', `
    width: 20px;
    margin-right: 8px
  `)
  const span = document.createElement('span')
  span.innerHTML = '加载中...'

  ele.appendChild(img)
  ele.appendChild(span)
  document.body.appendChild(ele);

  return {
    show() {
      ele.style.display = 'flex'
    },
    hide() {
      ele.style.display = 'none'
    }
  }
}

export {
  loadUserInfo,
  loadMenus,
  loadDicts,
  initHeaderAndAside,
  initToken,
  createLoading,
}