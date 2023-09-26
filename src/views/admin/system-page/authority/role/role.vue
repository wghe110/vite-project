<template>
  <div class="wrap-role">
    <c-section-item>
      <c-filter @keydown.enter.native="submitFn">
        <c-filter-item label="这是一个标签">
          <el-input
            v-model="val"
            placeholder="请输入内容"
            style="width: 100%"
          ></el-input>
        </c-filter-item>

        <c-filter-item label="这是一个标签">
          <el-input
            v-model="val"
            placeholder="请输入内容"
            style="width: 100%"
          ></el-input>
        </c-filter-item>

        <c-filter-item label="这是一个标签">
          <el-input
            v-model="val"
            placeholder="请输入内容"
            style="width: 100%"
          ></el-input>
        </c-filter-item>

        <c-filter-item label="这是一个标签">
          <el-input
            v-model="val"
            placeholder="请输入内容"
            style="width: 100%"
          ></el-input>
        </c-filter-item>

        <c-filter-item label="这是一个标签">
          <el-input
            v-model="val"
            placeholder="请输入内容"
            style="width: 100%"
          ></el-input>
        </c-filter-item>

        <c-filter-item>
          <el-button type="primary" @click="submitFn">查询</el-button>
          <el-button>重置</el-button>
        </c-filter-item>
      </c-filter>
    </c-section-item>

    <c-section-item class="content">
      <div class="info">
        <el-button type="primary" @click="submitFn">查询</el-button>
      </div>

      <div class="table-box">
        <c-table></c-table>
      </div>

      <div class="page-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.current"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, prev, pager, next, sizes, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </c-section-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: "",
      page: {
        current: 1,
      },
    };
  },
  methods: {
    submitFn() {
      console.log("submit");
    },
    handleSizeChange() {},
    handleCurrentChange() {},
  },
};
</script>

<style lang="scss" scoped>
.wrap-role {
  height: 100%;
  display: flex;
  flex-direction: column;
  > .content {
    flex: 1;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    > .info {
      margin-bottom: 16px;
    }
    > .table-box {
      flex: 1;
      min-height: 100px;
      overflow: hidden;
    }
    .page-box {
      display: flex;
      justify-content: flex-end;
      padding-top: 16px;
    }
  }
}
</style>