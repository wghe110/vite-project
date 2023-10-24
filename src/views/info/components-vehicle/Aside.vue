<template>
  <aside class="aside">
    <c-section-item class="container">
      <div class="filter">
        <el-input
          style="width: 100%"
          placeholder="请输入关键字过滤"
          v-model="filterVal"
          clearable
          @input="filterTreeFn"
        ></el-input>
      </div>
      <div class="scroll-x">
        <div class="scroll-y">
          <el-tree
            node-key="deptId"
            ref="treeRef"
            :data="treeData"
            :props="treeProps"
            highlight-current
            check-on-click-node
            :expand-on-click-node="false"
            :current-node-key="current"
            :filter-node-method="filterNode"
            @current-change="currentChangeFn"
          ></el-tree>
        </div>
      </div>
    </c-section-item>
  </aside>
</template>

<script>
import api from "@/apis/info-manage/car";

export default {
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      timer: null,
      filterVal: "",
      treeData: [],
      treeProps: {
        children: "childrens",
        label: "deptName",
      },
    };
  },
  computed: {
    current: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
        this.$emit("change", val);
      },
    },
  },
  created() {
    this.getTreeFn();
  },
  methods: {
    getTreeFn() {
      api.getOrgTree().then((res) => {
        this.treeData = res.result || [];
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.deptName.indexOf(value) !== -1;
    },
    filterTreeFn(val) {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$refs.treeRef.filter(val);
      }, 500);
    },
    currentChangeFn(val, node) {
      this.current = val.deptId;
    },
  },
};
</script>

<style lang="scss" scoped>
.aside {
  flex: 1;
  min-width: 200px;
  margin-right: 16px;
  > .container {
    height: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    .filter {
      padding: 24px 24px 16px;
    }
    .scroll-x {
      flex: 1;
      min-height: 200px;
      overflow-x: auto;
      overflow-y: hidden;
    }
    .scroll-y {
      height: 100%;
      overflow-y: auto;
      overflow-x: visible;
    }
  }
}

::v-deep {
  .el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    background-color: #409eff;
    color: #fff;
    > .el-tree-node__expand-icon:not(.is-leaf) {
      color: #fff;
    }
  }
}
</style>