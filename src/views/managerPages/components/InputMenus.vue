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
    :loading="loading"
  >
    <template v-slot="{ data }">
      <span>{{ data.title }}</span>
    </template>
  </InputTreeVue>
</template>

<script>
import InputTreeVue from "./InputTree.vue";
import api from "@/apis/system-manage/tenant";
import { arrayToTreeFn } from "@/utils/tool";

export default {
  components: {
    InputTreeVue,
  },
  props: {
    props: {
      type: Object,
      default() {
        return {
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
      loading: false,
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
      this.loading = true;
      const params = {
        roles: 0,
      };
      api
        .getMenus(params)
        .then((res) => {
          this.menuData = arrayToTreeFn(res || []);
        })
        .finally(() => {
          this.loading = false;
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