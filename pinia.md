# pinia使用教程

*`pinia`使用方法类似`vuex`，不过也有些不同，可以对比着看*
## 安装
  1. 安装包
  ```sh
  npm install pinia --save
  ```
  2. 挂载到项目的`main.js`
  ```js
  import { createApp } from 'vue'
  import App from './App.vue'
  const app = createApp(App)

  // 下面是挂载代码
  import { createPinia } from 'pinia'
  const pinia = createPinia()
  app.use(pinia)

  app.mount('#app')
  ```

  ## 定义和使用
   - 定义
   ```js
    import { defineStore } from 'pinia'

    export const useStore = defineStore('store', {
      // a function that returns a fresh state
      state: () => ({
        counter: 0,
        name: 'Eduardo',
      }),
      // optional getters
      getters: {
        // getters receive the state as first parameter
        doubleCount: (state) => state.counter * 2,
        // use getters in other getters
        doubleCountPlusOne(): number {
          return this.doubleCount + 1
        },
      },
      // optional actions
      actions: {
        reset() {
          // `this` is the store instance
          this.counter = 0
        },
      },
    })
   ```

   - 使用
   ```js
    import { defineComponent} from 'vue'
    import { useStore } from '@/stores/useStore'
    import { storeToRefs } from 'pinia'

    export default defineComponent({
      setup() {
        const store = useStore()

        // extract specific store properties
        const { counter, name } = storeToRefs(store)

        return {
          // gives access to the whole store in the template
          store,
          name,
          // gives access only to specific state or getter
          counter,
          doubleCount: main.doubleCount,
        }
      },
    })
   ```

  - 修改`state`的值
  ```js
    import { defineComponent} from 'vue'
    import { useStore } from '@/stores/useStore'

    export default defineComponent({
      setup() {
        const store = useStore()

        // 1.直接修改
        store.counter = 2;
        // 2.$patch 可以修改多个值
        store.$patch({
          counter: 3,
          name: 'hansomeBoy'
        })
        // 3.$patch 内函数修改
        store.$patch((state) => {
          state.counter = 4;
          state.name = 'beutiful'
        })
        // 4.通过$state全量赋值修改
        store.$state = {
          counter: 5,
          name: 'hehe'
        }
        // 5.重置数据
        store.$reset()

        return {}
      },
    })

  ```


  ## 使用原则
   - 尽可能少的数据存放在 `store` 里面
   - 模块的数据要新建与之对应的`store`来保存，不要放到一个文件里面
   - 全量数据推荐：用户信息/菜单信息/公共字典/布局信息