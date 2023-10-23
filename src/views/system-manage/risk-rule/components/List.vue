<template>
  <div class="wrap-list">
    <span class="word">
      <slot></slot>
    </span>

    <div class="action">
      <el-dropdown placement="bottom" @command="commandFn">
        <div class="icon">
          <i class="el-icon-more"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="item" v-for="item in actions" :key="item">{{ item }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    source: {
      type: Object,
      default () {
        return {}
      }
    },
    actions: {
        type: Array,
        default() {
            return ['修改', '删除']
        }
    }
  },
  data () {
    return {};
  },
  methods: {
    commandFn (item) {
      const { source } = this
      this.$emit("command", {
        item,
        source
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-list {
  display: flex;
  align-items: center;
  height: 36px;
  background-color: #f9fafc;
  border-radius: 2px;
  > .word {
    flex: 1;
    min-width: 100px;
    font-size: 14px;
    color: #242627;
    line-height: 1.4;
    margin-left: 12px;
  }
  > .action {
    .icon {
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 36px;
      cursor: pointer;
    }
    .el-icon-more {
      color: #a5a9b1;
      font-size: 14px;
      transform: rotate(90deg);
    }
  }
}

// .wrap-list + .wrap-list {
//   margin-top: 6px;
// }
</style>
