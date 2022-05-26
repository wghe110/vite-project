<template>
  <div>
    <c-tree-multiple-select
      v-model="val"
      label="分类多选"
      :items="items"
    ></c-tree-multiple-select>

    <c-tree-multiple-select
      v-model="val"
      label="show-parent"
      :items="items"
      show-parent
    ></c-tree-multiple-select>

    <c-tree-multiple-select
      v-model="val"
      label="placeholder"
      placeholder="请选择"
      :items="items"
    ></c-tree-multiple-select>

    <c-tree-multiple-select
      v-model="clearVal"
      label="clearable"
      clearable
      :items="items"
    ></c-tree-multiple-select>

    <c-tree-multiple-select
      v-model="val"
      label="disabled"
      disabled
      :items="items"
    ></c-tree-multiple-select>

    <c-tree-multiple-select
      v-model="errVal"
      label="错误信息"
      :items="items"
      error
      error-message="错误信息"
    ></c-tree-multiple-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: [],
      errVal: [1, 2],
      clearVal: [1, 2],
      items: [
        {
          text: "浙江",
          children: [
            {
              text: "杭州",
              id: 1,
            },
            {
              text: "温州",
              id: 2,
            },
            {
              text: "温州",
              id: 3,
            },
            {
              text: "温州",
              id: 4,
            },
            {
              text: "温州",
              id: 5,
            },
            {
              text: "温州",
              id: 6,
            },
            {
              text: "温州",
              id: 7,
            },
          ],
        },
        {
          text: "江苏",
          children: [
            {
              text: "南京",
              id: 11,
            },
            {
              text: "苏州",
              id: 12,
            },
          ],
        },
        {
          text: "河南",
          children: [
            {
              text: "郑州",
              id: 21,
            },
          ],
        },
        {
          text: "河南1",
          children: [],
        },
        {
          text: "河南2",
          children: [],
        },
        {
          text: "河南3",
          children: [],
        },
        {
          text: "河南4",
          children: [],
        },
        {
          text: "河南5",
          children: [],
        },
      ],
    };
  },
};
</script>

<style>
</style>