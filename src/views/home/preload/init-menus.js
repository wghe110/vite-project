import api from '@/apis/preload'
import { arrayToTree } from '@/utils/tool'
import store from '@/store/index'
import { cloneDeep } from 'lodash'

// 加载菜单列表
const loadMenus = () => {
  return new Promise((resolve, reject) => {
    api.getMenus().then(res => {
      store.commit('setMenuList', res)

      const arr = cloneDeep(res)
      const aMenus = arr.filter(item => ['menu1', 'menu2', 'menu2-sp'].includes(item.type))
      const menus = arrayToTree(aMenus || [])
      store.commit('setMenus', menus)
      resolve(menus)
    }, reject)
  })
}

export default loadMenus;