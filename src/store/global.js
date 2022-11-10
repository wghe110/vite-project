import { defineStore } from 'pinia'

const globalStore = defineStore('global', {
  state() {
    return {
      showMenu: true,
      userInfo: {},
      dicts: new Map()
    }
  }
})

export default globalStore