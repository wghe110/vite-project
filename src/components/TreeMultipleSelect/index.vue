<template>
  <div>
    <van-cell-group>
      <van-field
        is-link
        readonly
        input-align="right"
        error-message-align="right"
        clear-trigger="always"
        :label="label"
        :placeholder="placeholder"
        :disabled="disabled"
        v-bind="$attrs"
        @click="!disabled && showFn()"
      >
        <template #input>
          <slot name="values" :slot-scope="value" v-if="value.length">
            <div class="tagBox">
              <van-tag
                type="primary"
                color="#323233"
                plain
                v-for="item in valueObjs"
                class="checked-tag"
                :key="item.id"
                >{{
                  showParent ? `${item.parent}/${item.text}` : item.text
                }}</van-tag
              >
            </div>
          </slot>
          <span class="empty" v-else>{{ placeholder }}</span>
        </template>

        <template #right-icon v-if="clearable && valueObjs.length">
          <van-icon name="clear" color="#c8c9cc" @click.stop="clearFn" />
        </template>
      </van-field>
    </van-cell-group>

    <van-popup
      v-model="popVisible"
      round
      position="bottom"
      get-container="body"
    >
      <section class="item">
        <h2 class="tit">
          <span>已选 {{ label }}</span>
          <em>点击可取消</em>
        </h2>
        <div class="content">
          <van-tag
            type="primary"
            color="#323233"
            plain
            v-for="item in cacheObjs"
            class="preview-tag"
            :key="item.id"
            size="large"
            @click="deleteFn(item)"
            >{{
              showParent ? `${item.parent}/${item.text}` : item.text
            }}</van-tag
          >
        </div>
      </section>
      <section class="item">
        <h2 class="tit">
          <span>{{ label }}</span>
        </h2>
        <div class="content">
          <van-tree-select
            :items="items"
            :active-id.sync="activeIds"
            :main-active-index.sync="activeIndex"
          />
        </div>
      </section>

      <div class="btn-box">
        <van-button block @click="cancelFn">取消</van-button>
        <van-button block @click="resetFn">重置</van-button>
        <van-button block type="info" @click="sureFn">确定</van-button>
      </div>
    </van-popup>
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
    label: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    placeholder: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    showParent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      popVisible: false,
      cascaderValue: "",
      activeIndex: 0,
      activeIds: [],
    };
  },
  computed: {
    patData() {
      const { items } = this;
      const arr = [];
      items.forEach((item) => {
        const { children = [] } = item;
        if (children && children.length) {
          children.forEach((childItem) => {
            arr.push({
              ...childItem,
              parent: item.text,
            });
          });
        }
      });

      return arr;
    },
    valueObjs() {
      const { value, patData } = this;
      const arr = value.map((id) => patData.find((item) => item.id === id));
      return arr.filter((item) => !!item);
    },
    cacheObjs() {
      const { activeIds, patData } = this;
      const arr = activeIds.map((id) => patData.find((item) => item.id === id));
      return arr.filter((item) => !!item);
    },
  },
  methods: {
    showFn() {
      this.popVisible = true;

      this.activeIds = [...this.value];
    },
    resetFn() {
      this.activeIds = [];
      this.activeIndex = 0;
    },
    cancelFn() {
      this.popVisible = false;
    },
    sureFn() {
      this.$emit("input", this.activeIds);
      this.$emit("change", this.activeIds);

      this.popVisible = false;
    },
    deleteFn(item) {
      const { id } = item;
      const idx = this.activeIds.findIndex((item) => item === id);
      if (idx !== -1) this.activeIds.splice(idx, 1);
    },
    clearFn() {
      this.$emit("input", []);
      this.$emit("change", []);
      this.$emit("clear");
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  padding: 10px;
  > .tit {
    margin: 0 0 10px;
    > span {
      font-size: 14px;
      color: #222222;
      letter-spacing: 0;
      font-weight: 500;
    }
    > em {
      font-size: 12px;
      color: #cccccc;
      font-weight: 400;
      font-style: normal;
      margin-left: 10px;
    }
  }
  > .content {
    min-height: 120px;
    border: 1px solid #f7f8fa;
  }
}
.btn-box {
  display: flex;
  padding: 0 10px 10px;
  > button {
    & + button {
      margin-left: 10px;
    }
  }
}
.empty {
  color: #ccc;
}
.checked-tag {
  margin: 2px;
}
::v-deep {
  .van-field--error {
    .empty {
      color: #ee0a24;
    }
  }
  .van-tree-select__item--active {
    color: #345fd8;
  }
  .van-sidebar-item--select::before {
    background-color: #345fd8;
  }
}
.preview-tag {
  margin: 4px;
}
</style>