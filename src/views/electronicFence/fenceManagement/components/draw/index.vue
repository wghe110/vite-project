<template>
  <div class="wrap-draw">
    <div class="btn" @click="checkedFn('1')">
      <iconpark-icon
        name="Group418"
        :color="drawType === '1' ? '#0084ff' : '#37455A'"
      ></iconpark-icon>
    </div>
    <div class="btn" @click="checkedFn('2')">
      <iconpark-icon
        name="Group408"
        :color="drawType === '2' ? '#0084ff' : '#37455A'"
      ></iconpark-icon>
    </div>
    <div class="btn" @click="checkedFn('3')">
      <iconpark-icon
        name="Group403"
        :color="drawType === '3' ? '#0084ff' : '#37455A'"
      ></iconpark-icon>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawType: "",
    };
  },
  methods: {
    checkedFn(val) {
      this.drawType = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-draw {
  display: flex;
  > .btn {
    height: 36px;
    width: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 4px;
    &:hover {
      background-color: #f1f3f4;
    }
  }
}
</style>