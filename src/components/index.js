import Select from './Select/index.vue'
import SelectRadio from './SelectRadio/index.vue'
import MultipleSelect from './MultipleSelect/index.vue'
import MultipleSelectCheckbox from './MultipleSelectCheckbox/index.vue'
import Slider from './Slider/index.vue'

const VantPlus = {
  install(Vue, options) {
    // 组件
    Vue.component('c-select', Select)
    Vue.component('c-select-radio', SelectRadio)
    Vue.component('c-multiple-select', MultipleSelect)
    Vue.component('c-multiple-select-checkbox', MultipleSelectCheckbox)
    Vue.component('c-slider', Slider)
  }
}

export default VantPlus;