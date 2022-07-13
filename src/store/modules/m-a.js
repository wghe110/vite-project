// m-a
export default {
  namespaced: true,
  state: () => ({
    aVal: 2
  }),
  mutations: {
    add(state) {
      state.aVal += 1
    }
  },
  actions: {},
  getters: {}
}