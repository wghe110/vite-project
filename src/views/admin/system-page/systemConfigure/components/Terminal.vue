<template>
  <c-section-item class="wrap-terminal">
    <com-tit>终端选型</com-tit>

    <ul class="list">
      <li v-for="item in terminals" :key="item.key">
        <List
          :actions="['编辑', '删除']"
          v-if="!item.isEdit && !item.isAdd"
          @command="(command) => commandFn(command, item)"
          >{{ getNameFn(item.id) }}</List
        >
        <EditItem
          v-if="item.isEdit"
          v-model="item.id"
          :self-opt="getOptFn(item.id)"
          :options="filterOpts"
          @change="updateFn"
        />
        <AddItem
          v-if="item.isAdd"
          v-model="item.id"
          :options="filterOpts"
          @change="updateFn"
        />
      </li>

      <li>
        <AddBtn @click.native="addFn" />
      </li>
    </ul>
  </c-section-item>
</template>

<script>
import ComTit from "./Title.vue";
import List from "./terminal/List.vue";
import AddBtn from "./terminal/AddBtn.vue";
import AddItem from "./terminal/AddItem.vue";
import EditItem from "./terminal/EditItem.vue";
import api from "@/apis/system-manage/system";

export default {
  components: {
    ComTit,
    List,
    AddBtn,
    AddItem,
    EditItem,
  },
  props: {
    config: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      terminals: [],
      opts: [],
    };
  },
  computed: {
    filterOpts() {
      const { opts, config } = this;
      if (config?.terminalTypeVo?.terminalId) {
        return opts.filter(
          (item) =>
            !config.terminalTypeVo.terminalId.includes(Number(item.value))
        );
      } else {
        return opts;
      }
    },
  },
  watch: {
    config: {
      deep: true,
      immediate: true,
      handler(val) {
        this.initDataFn();
      },
    },
  },
  created() {
    this.getOptsFn();
  },
  methods: {
    initDataFn() {
      const { config } = this;
      if (config?.terminalTypeVo?.terminalId) {
        this.terminals = config.terminalTypeVo.terminalId.map((item) => ({
          key: String(item),
          id: String(item),
          isEdit: false,
          isAdd: false,
        }));
      } else {
        this.terminals = [];
      }
    },
    updateFn() {
      const newVal = this.getValueFn();
      this.$emit("update", newVal);
    },
    addFn() {
      this.terminals.push({
        key: Date.now(),
        id: "",
        isAdd: true,
      });
    },
    getOptsFn() {
      const params = {
        dicCode: "terminalType",
      };
      api.getTerminalOpts(params).then((res) => {
        const { data } = res;
        this.opts = (data || []).map((item) => ({
          value: item.itemCode,
          label: item.itemValue,
        }));
      });
    },
    getNameFn(val) {
      const { opts } = this;
      const obj = opts.find((item) => item.value === val);
      return obj ? obj.label : "--";
    },
    getValueFn() {
      const { carWarnSettingVo, areaShowSettingVo, ruleSettingVo } =
        this.config;

      const { terminals } = this;
      const terminalId = terminals
        .filter((item) => item.id)
        .map((item) => item.id);

      return {
        tcarWarnSettingVo: carWarnSettingVo,
        tareaShowSettingVo: areaShowSettingVo,
        truleSettingVo: ruleSettingVo,
        terminalTypeVo: {
          terminalId,
        },
      };
    },
    commandFn(val, item) {
      switch (val) {
        case "编辑":
          item.isEdit = true;
          break;
        case "删除":
          this.$confirm("此操作将删除名称为【ADAS】的终端, 是否继续?", "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.deleteFn(item);
            })
            .catch(() => {});

          break;
        default:
          break;
      }
    },
    deleteFn({ key }) {
      const { terminals } = this;
      const idx = terminals.findIndex((item) => item.key === key);
      if (idx !== -1) {
        terminals.splice(idx, 1);

        const newVal = this.getValueFn();
        this.$emit("update", newVal);
      }
    },
    getOptFn(id) {
      const { opts } = this;
      const obj = opts.find((item) => item.value === id);
      return obj ? [obj] : [];
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-terminal {
  > .list {
    width: calc(100% + 16px);
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin-top: -8px;
    margin-left: -12px;
    > li {
      list-style: none;
      padding: 8px 12px;
      width: 254px;
    }
  }
}
</style>