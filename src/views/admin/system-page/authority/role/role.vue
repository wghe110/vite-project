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
          <el-select v-model="selectVal" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
        <el-button type="primary" @click="createFn">新建</el-button>
      </div>

      <div class="table-box">
        <c-table :data="tableData">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
          <el-table-column label="操作" width="160">
            <template slot-scope="scope">
              <c-action-btns :actions="getActionsFn(scope)"></c-action-btns>
            </template>
          </el-table-column>
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

    <!-- dialog -->
    <c-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </c-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: "",
      page: {
        current: 1,
        size: 10,
        total: 400,
      },
      selectVal: "选项1",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],

      dialogVisible: true,
    };
  },
  created() {},
  methods: {
    submitFn() {
      console.log("submit");
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    getActionsFn(scope) {
      const { row } = scope;
      return [
        {
          text: "查看",
          clickFn() {
            console.log("查看scope", row);
          },
        },
        {
          text: "编辑",
          clickFn() {
            console.log("编辑scope", row);
          },
        },
        {
          text: "删除",
          clickFn() {
            console.log("删除scope", row);
          },
        },
        {
          text: "关闭",
          clickFn() {
            console.log("关闭scope", row);
          },
        },
      ];
    },
    createFn() {
      this.$alert("这是一段内容", "标题名称", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    },
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
  }
}
</style>