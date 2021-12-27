import Filter from './filter/index.vue'
import FilterItem from './filter/filter-item.vue'

export default {
  install: (app: any, options: any) => {
    app.component('c-filter', Filter)
    app.component('c-filter-item', FilterItem)


    app.directive()

    app.mixin({})
  }
}