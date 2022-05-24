<template>
  <van-cell-group>
    <van-field
      readonly
      clickable
      :value="value"
      :label="label"
      @click="showPopFn"
      input-align="right"
      error-message-align="right"
      is-link
      v-bind="$attrs"
      :disabled="disabled"
    />

    <van-popup v-model="showPicker" position="bottom" round>
      <van-datetime-picker
        :type="type"
        @confirm="onConfirm"
        @cancel="showPicker = false"
        ref="datetimeRef"
        :readonly="readonly"
      >
        <div></div>

        <template #columns-top>
          <div class="thead">
            <div v-for="item in columnTits" :key="item">{{ item }}</div>
          </div>
        </template>
      </van-datetime-picker>

      <div class="btn-box" v-if="!readonly">
        <van-button type="default" block @click="cancelFn">取消</van-button>
        <van-button type="info" block @click="confirmFn">确定</van-button>
      </div>
    </van-popup>
  </van-cell-group>
</template>

<script>
import { format } from "date-fns";

export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "time",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showPicker: false,
    };
  },
  computed: {
    columnTits() {
      const { type } = this;
      let arr = ["时", "分"];

      switch (type) {
        case "time":
          arr = ["时", "分"];
          break;
        case "date":
          arr = ["年", "月", "日"];
          break;
        case "year-month":
          arr = ["年", "月"];
          break;
        case "month-day":
          arr = ["月", "日"];
          break;
        case "datehour":
          arr = ["年", "月", "日", "时"];
          break;
        case "datetime":
          arr = ["年", "月", "日", "时", "分"];
          break;
        default:
          break;
      }

      return arr;
    },
  },
  methods: {
    showPopFn() {
      if (!this.disabled) this.showPicker = true;
    },
    onConfirm(val) {
      console.log("onConfirm", val);
      let value = val;

      switch (this.type) {
        case "time":
          break;
        case "date":
          value = format(val, "yyyy-MM-dd");
          break;
        case "year-month":
          value = format(val, "yyyy-MM");
          break;
        case "month-day":
          value = format(val, "MM-dd");
          break;
        case "datehour":
          value = format(val, "yyyy-MM-dd HH");
          break;
        case "datetime":
          value = format(val, "yyyy-MM-dd HH:mm");
          break;
        default:
          break;
      }

      this.$emit("input", value);
      this.$emit("change", value);

      this.showPicker = false;
    },
    confirmFn() {
      const datetime = this.$refs.datetimeRef.getPicker();

      datetime.confirm();
    },
    cancelFn() {
      const datetime = this.$refs.datetimeRef.getPicker();

      datetime.cancel();
    },
  },
};
</script>

<style lang="scss" scoped>
.thead {
  display: flex;
  > div {
    flex: 1;
    justify-content: center;
    display: flex;
    font-weight: bolder;
    position: relative;
    top: -20px;
  }
}

.btn-box {
  padding: 10px;
  display: flex;
  border-top: 8px solid #f7f8fa;
  > button + button {
    margin-left: 10px;
  }
}
</style>