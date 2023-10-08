
import SectionItem from './SectionItem.vue'
import Filter from './Filter.vue'
import FilterItem from './FilterItem.vue'
import Table from './Table.vue'
import Pagination from './Pagination.vue'
import ActionBtns from './ActionBtns.vue'
import Dialog from './Dialog.vue'

const VantPlus = {
  install(Vue, options) {
    // 组件
    Vue.component('c-section-item', SectionItem)
    Vue.component('c-filter', Filter)
    Vue.component('c-filter-item', FilterItem)
    Vue.component('c-table', Table)
    Vue.component('c-pagination', Pagination)
    Vue.component('c-action-btns', ActionBtns)
    Vue.component('c-dialog', Dialog)
  }
}

export default VantPlus;