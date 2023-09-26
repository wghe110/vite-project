<template>
  <div class="wrap">
    <ComAside v-if="showAside" :collapse="collapse" />

    <div class="content">
      <ComHeader v-if="showHeader" :collapse.sync="collapse" />

      <div class="inner-content">
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import ComHeader from "@/views/layout/header/index.vue";
import ComAside from "@/views/layout/aside/index.vue";

export default {
  components: {
    ComHeader,
    ComAside,
  },
  data() {
    return {
      collapse: false,
    };
  },
  computed: {
    ...mapState(["showHeader", "showAside"]),
  },
  methods: {},
};
</script>


<style lang="scss" scoped>
.wrap {
  height: 100vh;
  display: flex;
  background: #f0f2f5;
  overflow: auto;
  > .content {
    flex: 1;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    min-width: 1240px;
    > .inner-content {
      flex: 1;
      min-width: 500px;
      overflow: auto;
      min-height: 400px;
      > div {
        padding: 24px;
        height: 100%;
        box-sizing: border-box;
      }
    }
  }
}
</style>