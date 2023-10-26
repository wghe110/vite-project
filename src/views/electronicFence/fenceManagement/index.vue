<template>
  <div class="wrap-fence">
    <aside class="aside">
      <Tab v-model="tabVal">
        <TabItem value="create">新增围栏</TabItem>
        <TabItem value="list">围栏列表</TabItem>
      </Tab>

      <Tab2 v-model="tabVal2" v-show="tabVal === 'create'">
        <TabItem2 value="custom">自定义围栏</TabItem2>
        <TabItem2 value="admin">行政区围栏</TabItem2>
      </Tab2>

      <div class="inner">
        <component :is="aside"></component>
      </div>
    </aside>

    <section class="content">
      <keep-alive>
        <component :is="map"></component>
      </keep-alive>
    </section>
  </div>
</template>

<script>
import Custom from './components/Custom.vue'
import Admin from './components/Admin.vue'
import List from './components/List.vue'
import MapCustom from './components/maps/Custom.vue'
import MapAdmin from './components/maps/Admin.vue'
import MapList from './components/maps/List.vue'

import Tab from './components/tabs/one/Tab.vue'
import TabItem from './components/tabs/one/TabItem.vue'
import Tab2 from './components/tabs/two/Tab.vue'
import TabItem2 from './components/tabs/two/TabItem.vue'

export default {
  components: {
    Custom,
    Admin,
    List,
    MapCustom,
    MapAdmin,
    MapList,
    Tab,
    TabItem,
    Tab2,
    TabItem2,
  },
  data() {
    return {
      tabVal: 'create',
      tabVal2: 'custom',
    }
  },
  computed: {
    aside() {
      const { tabVal, tabVal2 } = this
      if (tabVal === 'create') {
        if (tabVal2 === 'custom') {
          return 'Custom'
        } else {
          return 'Admin'
        }
      } else {
        return 'List'
      }
    },
    map() {
      return `Map${this.aside}`
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-fence{
  height: calc(100% + 18px);
  margin: -18px -20px 0;
  display: flex;
  >.aside{
    flex: 1;
    min-width: 280px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    max-width: 340px;
    >.inner{
      flex: 1;
      overflow: auto;
      min-height: 240px;
    }
  }
  >.content{
    flex: 4;
    min-width: 600px;
    background-color: #F7F8FA;
  }
}
</style>
