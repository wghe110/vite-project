<template>
  <div class="wrap-rule">
    <Item>
      <TypeOne></TypeOne>
    </Item>

    <Item>
      <TypeTwo></TypeTwo>
    </Item>
    <Item>
      <TypeThree></TypeThree>
    </Item>
  </div>
</template>

<script>
import Item from "./components/Item.vue";
import TypeOne from "./type-one/index.vue";
import TypeTwo from "./type-two/index.vue";
import TypeThree from "./type-three/index.vue";

export default {
  components: {
    Item,
    TypeOne,
    TypeTwo,
    TypeThree,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>


<style lang="scss" scoped>
.wrap-rule {
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 170px);
}
</style>
