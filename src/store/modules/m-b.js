// m-b
export default {
  namespaced: true,
  state: () => ({
    bVal: 3
  }),
  mutations: {
    add(state){
      state.bVal += 1
    }
  },
  actions: {},
  getters: {}
}