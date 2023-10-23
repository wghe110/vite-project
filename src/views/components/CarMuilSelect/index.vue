<template>
  <div class="wrap-car-muil-select">
    <el-select
      v-model="cache"
      multiple
      collapse-tags
      clearable
      placeholder="请选择"
      style="width: 100%"
      :popper-append-to-body="false"
      :disabled="disabled"
      popper-class="hidden"
      @click.native="!disabled && showDialogFn()"
    >
      <el-option
        v-for="item in checkedNodes"
        :label="item.name"
        :value="item.id"
        :key="item.id"
      >
      </el-option>
    </el-select>

    <!-- 弹出框选择 -->
    <el-dialog
      width="400px"
      title="车辆选择"
      :visible.sync="visible"
      append-to-body
      :close-on-click-modal="false"
      @closed="resetFn"
    >
      <div class="filter">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model.trim="filterText"
          @input="filterFn"
        >
        </el-input>
      </div>

      <div class="content">
        <VueEasyTree
          ref="treeRef"
          node-key="id"
          show-checkbox
          height="calc(100vh - 440px)"
          :data="carData"
          :props="treeProps"
          :default-expand-all="expand"
          :key="key"
          :default-checked-keys="checkedKeys"
          @check="checkFn"
        ></VueEasyTree>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="sureFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VueEasyTree from "@wchbrad/vue-easy-tree";
import "@wchbrad/vue-easy-tree/src/assets/index.scss";
import { arrayToTreeFn } from "@/utils/tool";
import { tree, patTree } from "./deal";

export default {
  components: {
    VueEasyTree,
  },
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,

      timer: null,
      filterText: "",
      treeProps: {
        label: "name",
      },
      carData: tree,
      patData: patTree,
      checkedKeys: [],
      expand: false,
      key: 1,
    };
  },
  computed: {
    cache: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
        this.$emit("change", val);
      },
    },
    checkedNodes() {
      const { value, patData } = this;
      return patData.filter((item) => {
        return value.includes(item.id) && item.type === 1;
      });
    },
  },
  methods: {
    showDialogFn() {
      this.visible = true;
      this.checkedKeys = [...this.value];
    },
    filterFn(val) {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.filterTreeFn(val);
      }, 700);
    },
    filterTreeFn(val) {
      if (!val) {
        this.carData = tree;
        this.expand = false;
        this.key++;
        return;
      }

      const arr = this.patData.filter((item) => item.name.includes(val));

      const aKeys = arr.map((item) => {
        const { ancestorKeys } = item;
        if (ancestorKeys) {
          return ancestorKeys.split(",");
        } else {
          return [];
        }
      });

      const matchKeys = arr.map((item) => item.id);
      aKeys.forEach((item) => {
        matchKeys.push(...item);
      });

      const set = new Set(matchKeys);
      const aResultKeys = [...set];
      const nodes = this.patData.filter((item) =>
        aResultKeys.includes(item.id)
      );
      this.carData = arrayToTreeFn(nodes, "id", "pid");
      this.expand = true;
      this.key++;
    },
    checkFn({ id }, { checkedKeys }) {
      const checked = checkedKeys.includes(id);
      checked ? this.checkedFn(id) : this.uncheckedFn(id);
    },
    uncheckedFn(key) {
      const { checkedKeys, patData } = this;
      const set = new Set(checkedKeys);
      // 删除后代
      const offspring = patData.filter((item) => {
        const { ancestorKeys } = item;
        if (ancestorKeys) {
          const arr = ancestorKeys.split(",");
          return arr.includes(key);
        }
        return false;
      });

      offspring.forEach((item) => {
        set.delete(item.id);
      });
      // 删除自己
      set.delete(key);
      // 删除祖先
      const node = patData.find((item) => item.id === key);
      if (node.ancestorKeys) {
        const keys = node.ancestorKeys.split(",");
        keys.forEach((val) => {
          set.delete(val);
        });
      }

      this.checkedKeys = [...set];
    },
    checkedFn(key) {
      const { checkedKeys, patData } = this;
      const set = new Set(checkedKeys);

      // 添加后代
      const offspring = patData.filter((item) => {
        const { ancestorKeys } = item;
        if (ancestorKeys) {
          const arr = ancestorKeys.split(",");
          return arr.includes(key);
        }
        return false;
      });

      offspring.forEach((item) => {
        set.add(item.id);
      });
      // 添加自己
      set.add(key);

      this.checkedKeys = [...set];
    },
    resetFn() {
      this.filterText = "";
      this.checkedKeys = [];
      this.key++;
    },
    sureFn() {
      this.visible = false;
      this.cache = this.checkedKeys;
      this.key++;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-car-muil-select {
  width: 220px;
}
.filter {
  margin-bottom: 16px;
}
</style>
<style>
.hidden {
  display: none !important;
}
</style>