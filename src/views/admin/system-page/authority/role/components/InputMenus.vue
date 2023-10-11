<template>
  <InputTreeVue
    show-checkbox
    ref="inputTreeRef"
    :render-after-expand="false"
    node-key="id"
    :data="menuData"
    :props="props"
    :default-checked-keys="checkedVal"
    @check-change="checkFn"
  >
    <template v-slot="{ data }">
      <span>{{ data.title }}</span>
    </template>
  </InputTreeVue>
</template>

<script>
import InputTreeVue from "./InputTree.vue";
import api from "@/apis/system";

export default {
  components: {
    InputTreeVue,
  },
  props: {
    props: {
      type: Object,
      default() {
        return {
          children: "items",
          label: "id",
        };
      },
    },
    value: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      timer: null,
      cache: new Set(),
      menuData: [],
    };
  },
  computed: {
    checkedVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  created() {
    this.getMenusFn();
  },
  methods: {
    getMenusFn() {
      const params = {
        roles: 0,
      };
      api.getMenuList(params).then((res) => {
        const { items } = res || {};
        this.menuData = items || [];
      });
    },
    checkFn(data, checked) {
      // 触发频率太高，节流处理
      const set = new Set(this.checkedVal);
      checked ? this.cache.add(data.id) : set.delete(data.id);

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.checkedVal = [...new Set([...set, ...this.cache])];
        this.cache.clear();
      }, 300);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>