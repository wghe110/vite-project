import { defineStore } from 'pinia'

const globalStore = defineStore('global', {
  state() {
    return {
      showHeader: true,
      showAside: true,
    }
  }
})

export default globalStore