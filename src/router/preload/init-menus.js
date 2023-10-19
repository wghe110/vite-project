import api from '@/apis/preload'
import { arrayToTreeFn } from '@/utils/tool'
import store from '@/store/index'
import { cloneDeep } from 'lodash'
import router from '@/router/index'
import NotFound from '@/views/layout/not-found.vue'

const modules = import.meta.glob('../../views/**/*.vue')

const initRouteFn = (item) => {

  const { id, name, parentId, title, url, component } = item
  const route = {
    id,
    parentId,
    title,
    path: url,
    name,
    meta: {
      title,
      id,
    }
  }

  if (typeof component === 'string' && component) {
    const url = `../../${component}`
    route.component = modules[url] || NotFound
    route.meta.path = component
  }

  return route
}

// 加载菜单列表
const loadMenus = () => {
  return new Promise((resolve, reject) => {
    api.getMenus().then(res => {
      store.commit('setMenuList', res)

      const arr = cloneDeep(res)
      const aMenus = arr.filter(item => ['menu1', 'menu2', 'menu2-sp'].includes(item.type))
      const menus = arrayToTreeFn(aMenus || [])
      store.commit('setMenus', menus)

      const arr2 = cloneDeep(res)
      const aMenus2 = arr2.filter(item => ['menu1', 'menu2', 'menu2-sp', 'non-menu'].includes(item.type))
      const aRoutes = aMenus2.map(item => initRouteFn(item))

      aRoutes.forEach(item => {
        router.addRoute('main', item)
      })
      console.log('router', router.getRoutes())

      resolve(res)
    }, reject)
  })
}

export default loadMenus;