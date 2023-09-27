<template>
  <div class="wrap-action-btns">
    <div v-if="actions.length <= limit">
      <el-button
        type="text"
        v-for="item in actions"
        :key="item.text"
        @click="item.clickFn"
        >{{ item.text }}</el-button
      >
    </div>

    <div v-else>
      <el-button
        type="text"
        v-for="item in showList"
        :key="item.text"
        @click="item.clickFn"
        >{{ item.text }}</el-button
      >

      <el-dropdown>
        <div class="more">
          <span>更多</span>
          <i class="el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            class="opt-drop"
            :command="hItem.text"
            v-for="hItem in hideList"
            :key="hItem.text"
            >{{ hItem.text }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    actions: {
      type: Array,
      default() {
        return [];
      },
    },
    limit: {
      type: Number,
      default: 3,
    },
  },
  computed: {
    showList() {
      const { actions, limit } = this;
      return actions.slice(0, limit - 1);
    },
    hideList() {
      const { actions, limit } = this;
      return actions.slice(limit - 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.more {
  display: inline;
  font-size: 14px;
  color: #409eff;
  margin-left: 10px;
  cursor: pointer;
}
.opt-drop {
  color: #0084ff;
}
</style>