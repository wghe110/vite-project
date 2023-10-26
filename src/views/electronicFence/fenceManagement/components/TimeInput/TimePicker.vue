<template>
  <div class="wrap-time-picker">
    <el-popover placement="bottom" trigger="click" :disabled="disabled">
      <div :class="`view ${disabled ? 'disabled' : ''}`" slot="reference">
        <span class="val">{{ start }}</span>
        <span>至</span>
        <span class="val">{{ end }}</span>
        <i class="el-icon-time"></i>
      </div>

      <div class="custom-time-pop">
        <div class="inner">
          <div class="select">
            <h2 class="tit">开始时间</h2>
            <ul class="list">
              <li
                v-for="item in opts"
                :class="{ selected: item === start }"
                :key="item"
                @click="selectStartFn(item)"
              >
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="select">
            <h2 class="tit">结束时间</h2>
            <ul class="list">
              <li
                v-for="item in opts"
                :class="{ selected: item === end }"
                :key="item"
                @click="selectEndFn(item)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
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
      opts: [],
    };
  },
  computed: {
    val: {
      get() {
        return this.value;
      },
      set(newVal) {
        this.$emit("input", newVal);
        this.$emit("change", newVal);
      },
    },
    start() {
      return this.val.length ? this.val[0] : "";
    },
    end() {
      return this.val.length ? this.val[1] : "";
    },
  },
  created() {
    this.createOptsFn();
  },
  methods: {
    createOptsFn() {
      for (let h = 9; h < 24; h++) {
        const hh = h >= 10 ? h : `0${h}`;
        for (let m = 0; m < 60; m += 30) {
          const mm = m >= 10 ? m : `0${m}`;
          this.opts.push(`${hh}:${mm}`);
        }
      }
    },
    selectStartFn(val) {
      this.val = [val, this.val[1]];
    },
    selectEndFn(val) {
      this.val = [this.val[0], val];
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-time-picker {
  .view {
    display: flex;
    height: 36px;
    padding: 0 12px;
    border-radius: 2px;
    border: 1px solid #eaebec;
    align-items: center;
    &.disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      > span {
        color: #c0c4cc;
      }
    }
    > span {
      color: #242627;
      font-family: PingFang SC;
      font-size: 14px;
      line-height: 1.2;
      &.val {
        flex: 1;
        text-align: center;
      }
    }
    > i {
      color: #a5a9b1;
    }
  }
}
</style>

<style lang="scss">
.custom-time-pop {
  > .inner {
    display: flex;
    // margin-bottom: 16px;
    > .select {
      flex: 1;
      min-width: 150px;
      & + .select {
        margin-left: 14px;
      }
      > .tit {
        color: #606266;
        font-size: 14px;
        line-height: 30px;
        margin-bottom: 5px;
        font-weight: normal;
        text-align: center;
      }
      > .list {
        border: 1px solid #e4e7ed;
        border-radius: 2px;
        height: 190px;
        overflow: auto;
        padding: 0;
        > li {
          list-style: none;
          padding: 8px 10px;
          font-size: 14px;
          line-height: 20px;
          color: #606266;
          &:hover {
            background-color: #f5f7fa;
            font-weight: 700;
            cursor: pointer;
          }
          &.selected {
            color: #409eff;
            font-weight: 700;
          }
        }
      }
    }
  }
  > .btn {
    border-top: 1px solid #e4e4e4;
    display: flex;
    justify-content: flex-end;
    margin: 0 -12px -12px;
    padding: 0 12px;
  }
}
</style>
