<template>
  <div class="wrap-item-edit">
    <div class="content">
      <div class="select-box">
        <el-select
          v-model="obj.type"
          filterable
          placeholder="选择报警类型"
          size="small"
          style="width: 100%"
        >
          <el-option
            v-for="item in Opts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <!-- <a class="link" @click="setInfoFn">
        <i class="el-icon-chat-dot-square"></i>
        <span style="margin-left: 2px">下发设置</span>
      </a> -->
    </div>

    <div class="actions">
      <el-button type="text" size="small" @click="saveFn">保存</el-button>
      <el-divider direction="vertical"></el-divider>
      <el-button
        type="text"
        size="small"
        style="color: #979797"
        @click="cancelFn"
        >取消</el-button
      >
    </div>

    <PopItemEdit
      :visible.sync="pop.visible"
      :source="obj"
      ref="popRef"
      @sure="popSureFn"
    ></PopItemEdit>
  </div>
</template>

<script>
import api from "@/apis/system-manage/risk-rule";

import PopItemEdit from "./PopItemEdit.vue";

export default {
  props: {
    source: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    PopItemEdit,
  },
  data() {
    return {
      options: [],

      obj: {
        type: "",
      },

      pop: {
        visible: false,
      },
    };
  },
  created() {
    this.initFn();
    this.searchOptsFn();
  },
  computed: {
    Opts() {
      const opts = [...this.options];

      const { isEdit } = this.source;
      if (isEdit) {
        opts.unshift({
          value: this.source.alarmCode,
          label: this.source.alarmValue,
        });
      }

      return opts;
    },
  },
  methods: {
    searchOptsFn() {
      api.getAutoAlarmShow().then((res) => {
        const { result } = res;
        try {
          const keys = Object.keys(result);
          this.options = keys.map((key) => ({
            value: key,
            label: result[key],
          }));
        } catch (error) {
          this.$message.error(`告警自动处理配置下拉框查询失败`);
        }
      });
    },
    initFn() {
      this.obj = {
        ...this.source,
      };
    },
    cancelFn() {
      this.$emit("cancel");
    },
    saveFn() {
      this.validateFn().then((valid) => {
        if (valid) {
          const obj = {
            ...this.obj,
          };

          this.$emit("save", obj);
        }
      });
    },
    validateFn() {
      return new Promise((resolve, reject) => {
        const {
          obj: { type },
        } = this;
        let flag = true;
        if (!type) {
          flag = false;
          this.$message.error("请选择报警类型");
        }

        resolve(flag);
      });
    },
    setInfoFn() {
      this.pop.visible = true;
      this.$nextTick(() => {
        this.$refs.popRef.initFn();
      });
    },
    popSureFn(obj) {
      this.obj = {
        ...obj,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-item-edit {
  height: 36px;
  display: flex;
  align-items: center;
  > .content {
    flex: 1;
    min-width: 100px;
    display: flex;
    align-items: center;
    > .select-box {
      flex: 1;
      min-width: 80px;
      max-width: 180px;
    }
    > .link {
      color: #242627;
      font-size: 14px;
      margin-left: 22px;
    }
  }
  > .actions {
    display: flex;
    align-items: center;
  }
}
</style>