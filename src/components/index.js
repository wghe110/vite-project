import Select from './Select/index.vue'
import SelectRadio from './SelectRadio/index.vue'
import MultipleSelect from './MultipleSelect/index.vue'
import MultipleSelectCheckbox from './MultipleSelectCheckbox/index.vue'
import Slider from './Slider/index.vue'
import DatetimePicker from './DatetimePicker/index.vue'
import Upload from './Upload/index.vue'
import Field from './Field/index.vue'

const VantPlus = {
  install(Vue, options) {
    // 组件
    Vue.component('c-select', Select)
    Vue.component('c-select-radio', SelectRadio)
    Vue.component('c-multiple-select', MultipleSelect)
    Vue.component('c-multiple-select-checkbox', MultipleSelectCheckbox)
    Vue.component('c-slider', Slider)
    Vue.component('c-datetime-picker', DatetimePicker)
    Vue.component('c-upload', Upload)
    Vue.component('c-field', Field)
  }
}

export default VantPlus;