// dict
export default {
  namespaced: true,
  state: () => ({
    carTree: [],
    patCarTree: []
  }),
  mutations: {
    setCarTree(state, val) {
      state.carTree = val
    },
    setPatCarTree(state, val) {
      state.patCarTree = val
    },
  },
  actions: {},
  getters: {}
}