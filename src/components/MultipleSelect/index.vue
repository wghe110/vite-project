<template>
  <div>
    <van-field
      is-link
      input-align="right"
      error-message-align="right"
      :label="label"
      @click="!disabled && showPopFn()"
      :required="required"
      v-bind="$attrs"
      :disabled="disabled"
      clearable
    >
      <template #input>
        <van-checkbox-group
          :value="value"
          direction="horizontal"
          class="checkboxgroup"
        >
          <van-checkbox
            :name="opt.value"
            shape="square"
            v-for="opt in options"
            :key="opt.value"
            >{{ opt.text }}</van-checkbox
          >
        </van-checkbox-group>

        <slot name="values" :slot-scope="value" v-if="value.length">
          <div class="tagBox">
            <van-tag
              type="primary"
              color="#323233"
              plain
              v-for="tag in valueText"
              class="checked-tag"
              :key="tag"
              >{{ tag }}</van-tag
            >
          </div>
        </slot>
        <span class="empty" v-else>{{ placeholder }}</span>
      </template>

      <slot></slot>
    </van-field>

    <van-action-sheet
      v-model="popVisible"
      :title="label"
      @cancel="cancelFn"
      @click-overlay="cancelFn"
      get-container="body"
    >
      <div class="content" :style="{ height: `${contentHeight}px` }">
        <van-cell-group>
          <van-cell
            v-for="opt in options"
            :key="opt.value"
            :class="{ disabled: opt.disabled }"
            @click="!opt.disabled && toggleChecke(opt)"
          >
            <!-- title -->
            <template #title>
              <span v-if="isChecked(opt)" :style="{ color: checkedColor }">{{
                opt.text
              }}</span>
              <span v-else>{{ opt.text }}</span>
            </template>

            <!-- icon-checked -->
            <template #right-icon v-if="isChecked(opt)">
              <van-icon
                name="success"
                :style="{ color: checkedColor }"
                class="checked-icon"
              />
            </template>
          </van-cell>
        </van-cell-group>
      </div>

      <div class="btn-box">
        <van-button type="default" block @click="closePopFn">取消</van-button>
        <van-button type="info" block @click="sureFn">确定</van-button>
      </div>
    </van-action-sheet>
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
    label: String,
    placeholder: String,
    required: Boolean,
    contentHeight: {
      type: Number,
      default: 300,
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    checkedColor: {
      type: String,
      default: "#345FD8",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      popVisible: false,
      cacheValue: [],
    };
  },
  computed: {
    valueText() {
      const { options, value } = this;
      return value.map((val) => {
        const obj = options.find((item) => item.value === val);
        return obj ? obj.text : val;
      });
    },
    valueObjs() {
      const { options, value } = this;
      return options.filter((item) => value.includes(item.value));
    },
  },
  methods: {
    showPopFn() {
      this.popVisible = true;
      this.cacheValue = [...this.value];
    },
    cancelFn() {
      console.log("cancel");
    },
    closePopFn() {
      this.popVisible = false;
      this.cancelFn();
    },
    isChecked(obj) {
      const { value } = obj;
      return this.cacheValue.includes(value);
    },
    toggleChecke(obj) {
      const { value } = obj;
      if (this.cacheValue.includes(value)) {
        const idx = this.cacheValue.findIndex((val) => val === value);
        if (idx !== -1) this.cacheValue.splice(idx, 1);
      } else {
        this.cacheValue.push(value);
      }
    },
    sureFn() {
      this.$emit("input", this.cacheValue);
      this.$emit("change", this.cacheValue);
      this.popVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.checkboxgroup {
  display: none;
}
.empty {
  color: #ccc;
}
.content {
  overflow: auto;
}
.btn-box {
  padding: 10px;
  display: flex;
  border-top: 8px solid #f7f8fa;
  > button + button {
    margin-left: 10px;
  }
}

.checked-tag {
  margin: 2px;
}
.checked-icon {
  display: flex;
  align-items: center;
}
.disabled {
  color: #c8c9cc;
}
::v-deep {
  .van-field--error {
    .empty {
      color: #ee0a24;
    }
  }
}
</style>