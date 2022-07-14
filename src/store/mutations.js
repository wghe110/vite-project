export default {
  globalAdd(state) {
    state.global += 1
  },
  setShowHeader(state, val) {
    state.showHeader = val;
  },
  setShowAside(state, val) {
    state.showAside = val;
  }
}