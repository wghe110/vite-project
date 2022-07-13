import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import modules from './modules/index'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

// 全局
const store = new Vuex.Store({
  state: {
    global: 1
  },
  getters,
  mutations,
  actions,
  modules,
})

export default store;