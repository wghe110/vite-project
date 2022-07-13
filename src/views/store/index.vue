<template>
  <div>
    <span>全局global={{ global }}</span>
    <button @click="globalAddFn">global++</button>
    <hr />

    <span>a模块下aVal={{ aVal }}</span>
    <button @click="aValAddFn">aVal++</button>
    <hr />

    <span>b模块下bVal={{ bVal }}</span>
    <button @click="bValAddFn">bVal++</button>
    <hr />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      global: (state) => state.global,
      aVal: (state) => state.a.aVal,
      bVal: (state) => state.b.bVal,
    }),
  },
  created() {
    console.log("this.$store", this.$store);
  },
  methods: {
    globalAddFn() {
      this.$store.commit("globalAdd");
    },
    aValAddFn() {
      this.$store.commit("a/add");
    },
    bValAddFn() {
      this.$store.commit("b/add");
    },
  },
};
</script>

<style>
</style>