import { defineStore } from 'pinia'

const demoStore = defineStore('demo', {
  state() {
    return {
      count: 0
    }
  },
  actions: {
    add() {
      this.count += 1
    },
  }
})

export default demoStore