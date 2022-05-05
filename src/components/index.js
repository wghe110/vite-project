import Select from './Select/index.vue'
import MultipleSelect from './MultipleSelect/index.vue'
import MultipleSelectCheckbox from './MultipleSelectCheckbox/index.vue'

const VantPlus = {
  install(Vue, options) {
    // 组件
    Vue.component('c-select', Select)
    Vue.component('c-multiple-select', MultipleSelect)
    Vue.component('c-multiple-select-checkbox', MultipleSelectCheckbox)
  }
}

export default VantPlus;