export default {
  globalAdd(state) {
    state.global += 1
  },
  setShowHeader(state, val) {
    state.showHeader = val;
  },
  setShowAside(state, val) {
    state.showAside = val;
  },
  setMenus(state, val) {
    state.menus = val
  },
  setMenuList(state, val) {
    state.menuList = val
  }
}