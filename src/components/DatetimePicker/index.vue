<template>
  <van-cell-group>
    <van-field
      readonly
      clickable
      :value="fieldVal"
      :label="label"
      @click="!disabled && showPopFn()"
      input-align="right"
      error-message-align="right"
      is-link
      v-bind="$attrs"
      :disabled="disabled"
    >
      <template #right-icon v-if="clearable && fieldVal">
        <van-icon name="clear" color="#c8c9cc" @click.stop="clearFn" />
      </template>
    </van-field>

    <van-popup
      v-model="showPicker"
      position="bottom"
      round
      get-container="body"
    >
      <van-datetime-picker
        :type="type"
        :key="renderKey"
        v-model="currentDate"
        @confirm="confirmFn"
        @cancel="cancelFn"
        @change="changeFn"
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
        <van-button type="default" block size="small" @click="cancelFn"
          >取消</van-button
        >
        <van-button type="info" block size="small" @click="confirmFn"
          >确定</van-button
        >
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
      type: [Date, String],
      default() {
        return new Date();
      },
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
    clearable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showPicker: false,
      currentDate: new Date(),
      renderKey: Date.now(),
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
    fieldVal() {
      const { value, type } = this;
      let str = "";
      if (value && value instanceof Date) {
        switch (type) {
          case "date":
            str = format(value, "yyyy-MM-dd");
            break;
          case "year-month":
            str = format(value, "yyyy-MM");
            break;
          case "month-day":
            str = format(value, "MM-dd");
            break;
          case "datehour":
            str = format(value, "yyyy-MM-dd HH");
            break;
          case "datetime":
            str = format(value, "yyyy-MM-dd HH:mm");
            break;
          default:
            break;
        }
      } else if (typeof value === "string") {
        str = value;
      }

      return str;
    },
  },
  methods: {
    showPopFn() {
      this.showPicker = true;

      if (this.type === "time") {
        if (this.value) {
          if (typeof this.value === "string") {
            this.currentDate = this.value;
          } else if (this.value instanceof Date) {
            this.currentDate = format(this.value, "HH:mm");
          }
        } else {
          this.currentDate = "";
        }
      } else {
        if (this.value && this.value instanceof Date) {
          this.currentDate = new Date(Date.parse(this.value));
        } else {
          this.currentDate = new Date();
        }
      }

      this.renderKey = Date.now();
    },
    confirmFn() {
      let val = this.currentDate;
      if (this.type === "time" && !this.currentDate) {
        val = "00:00";
      }
      this.$emit("input", val);
      this.$emit("change", val);
      this.$emit("confirm", val);

      this.showPicker = false;
    },
    cancelFn() {
      this.$emit("cancel");
      this.showPicker = false;
    },
    changeFn() {
      this.$emit("picker-change", this.currentDate);
    },
    clearFn() {
      this.$emit("input", null);
      this.$emit("change", null);
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