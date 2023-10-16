<template>
  <div class="wrap-log">
    <c-section-item>
      <c-filter @keydown.enter.native="searchFn">
        <c-filter-item label="用户名">
          <el-input
            v-model="uname"
            placeholder="请输入用户名"
            style="width: 100%"
            clearable
          ></el-input>
        </c-filter-item>

        <c-filter-item>
          <el-button type="primary" @click="searchFn(true)">查询</el-button>
          <el-button @click="resetFn">重置</el-button>
        </c-filter-item>
      </c-filter>
    </c-section-item>

    <c-section-item class="content">
      <div class="table-box">
        <c-table :data="tableData">
          <el-table-column prop="userName" label="用户"> </el-table-column>
          <el-table-column prop="ip" label="IP"></el-table-column>
          <el-table-column prop="time" label="时间"></el-table-column>
          <el-table-column prop="message" label="操作信息"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
        </c-table>
      </div>

      <c-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-size="page.size"
        :total="page.total"
      ></c-pagination>
    </c-section-item>
  </div>
</template>

<script>
import api from "@/apis/system";

export default {
  data() {
    return {
      uname: "",
      page: {
        current: 1,
        size: 10,
        total: 0,
      },
      tableData: [],
    };
  },
  created() {
    this.searchFn(true);
  },
  methods: {
    searchFn(resetPage = false) {
      if (resetPage) this.page.current = 1;

      const params = this.getParamsFn();
      api.getLoginLogList(params).then((res) => {
        const { recordsTotal, data } = res;
        this.tableData = data || [];
        this.page.total = recordsTotal || 0;
      });
    },
    getParamsFn() {
      const {
        uname,
        page: { current, size },
      } = this;

      return {
        page: current,
        size,
        "userName.contains": uname,
        sort: "time,desc",
      };
    },
    resetFn() {
      this.uname = "";
      this.page.current = 1;
      this.page.size = 10;

      this.searchFn();
    },
    handleSizeChange(val) {
      this.page.size = val;
      this.searchFn(true);
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.searchFn();
    },
  },
};
</script>


<style lang="scss" scoped>
.wrap-log {
  height: 100%;
  display: flex;
  flex-direction: column;
  > .content {
    flex: 1;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    > .table-box {
      flex: 1;
      min-height: 100px;
      overflow: hidden;
    }
  }
}
</style>