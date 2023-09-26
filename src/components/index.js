
import SectionItem from './SectionItem.vue'
import Filter from './Filter.vue'
import FilterItem from './FilterItem.vue'
import Table from './Table.vue'

const VantPlus = {
  install(Vue, options) {
    // 组件
    Vue.component('c-section-item', SectionItem)
    Vue.component('c-filter', Filter)
    Vue.component('c-filter-item', FilterItem)
    Vue.component('c-table', Table)
  }
}

export default VantPlus;