<template>
  <div class="wrap-vehicle">
    <AsideCom
      ref="asideRef"
      v-model="form.deptId"
      @change="searchFn(true)"
    ></AsideCom>

    <div class="content">
      <c-section-item>
        <c-filter @keydown.enter.native="searchFn">
          <c-filter-item label="车辆类型" style="width: 33.3%">
            <el-select
              v-model="form.carType"
              placeholder="请选择车辆类型"
              style="width: 100%"
              clearable
            >
              <el-option
                v-for="item in opts.carType"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </c-filter-item>
          <c-filter-item label="车牌号" style="width: 33.3%">
            <el-input
              v-model="form.carNo"
              placeholder="请输入车牌号"
              style="width: 100%"
              clearable
            ></el-input>
          </c-filter-item>
          <c-filter-item label="车辆颜色" style="width: 33.3%">
            <el-select
              v-model="form.carNoColor"
              placeholder="请选择车辆颜色"
              style="width: 100%"
              clearable
            >
              <el-option
                v-for="item in opts.carNoColor"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </c-filter-item>
          <c-filter-item label="创建时间" style="width: 540px">
            <el-date-picker
              v-model="form.createTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 100%"
            >
            </el-date-picker>
          </c-filter-item>
          <c-filter-item>
            <el-button type="primary" @click="searchFn(true)">查询</el-button>
            <el-button @click="resetFn">重置</el-button>
          </c-filter-item>
        </c-filter>
      </c-section-item>

      <c-section-item class="inner-con">
        <div class="info">
          <el-button type="primary" icon="el-icon-plus" @click="createFn"
            >新增车辆</el-button
          >
          <el-button icon="el-icon-download" @click="createFn"
            >导出报表</el-button
          >
          <el-button icon="el-icon-upload" @click="createFn"
            >批量导入</el-button
          >
          <el-button type="text" icon="el-icon-document" @click="createFn"
            >下载导入模版</el-button
          >
        </div>

        <div class="table-box">
          <c-table :data="tableData">
            <el-table-column prop="carNo" label="车牌号"> </el-table-column>
            <el-table-column prop="carNoColor" label="车牌颜色">
              <template slot-scope="scope">
                <span>{{ getCorFn(scope.row.carNoColor) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="deptName" label="所属部门"></el-table-column>
            <el-table-column prop="carType" label="车辆类型"></el-table-column>
            <el-table-column prop="carAddress" label="车籍地"></el-table-column>
            <el-table-column prop="isyj" label="运营监管" width="80px">
              <template slot-scope="scope">
                <span>{{ scope.row.isyj === "1" ? "是" : "否" }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
            ></el-table-column>
            <el-table-column label="操作" width="140">
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
    </div>
  </div>
</template>

<script>
import AsideCom from "./components-vehicle/Aside.vue";
import api from "@/apis/info-manage/car";
import { format } from "date-fns";

export default {
  components: {
    AsideCom,
  },
  data() {
    return {
      form: {
        deptId: "",
        carType: "",
        carNo: "",
        carNoColor: "",
        createTime: [],
      },
      opts: {
        carType: [],
        carNoColor: [],
      },
      page: {
        current: 1,
        size: 10,
        total: 0,
      },
      tableData: [],
    };
  },
  created() {
    this.initFn();
    this.searchFn();
  },
  methods: {
    initFn() {
      this.getDictFn("carType").then((opts) => {
        this.opts.carType = opts;
      });
      this.getDictFn("carNoColor").then((opts) => {
        this.opts.carNoColor = opts;
      });
    },
    searchFn(resetPage = false) {
      if (resetPage) this.page.current = 1;

      const params = this.getParamsFn();
      api.getList(params).then((res) => {
        const {
          result: { total, records },
        } = res;
        this.tableData = records || [];
        this.page.total = total || 0;
      });
    },
    getParamsFn() {
      const {
        form: { createTime, ...others },
        page: { current, size },
      } = this;

      const params = {
        pageNo: current,
        pageSize: size,
        ...others,
      };

      if (createTime && createTime.length === 2) {
        params.startTime = format(createTime[0], "yyyy-MM-dd HH:mm:ss");
        params.stopTime = format(createTime[1], "yyyy-MM-dd HH:mm:ss");
      }
      if (params.deptId) {
        params.type = 0;
      } else {
        delete params.type;
      }

      return params;
    },
    resetFn() {
      this.form = {
        deptId: "",
        carType: "",
        carNo: "",
        carNoColor: "",
        createTime: [],
      };
      this.page.current = 1;
      this.page.size = 10;

      this.$refs.asideRef.$refs.treeRef.setCurrentKey(null);

      this.searchFn();
    },
    createFn() {
      this.$refs.createRef.visible = true;
    },
    getActionsFn(scope) {
      const { row } = scope;
      const self = this;
      const arr = [
        {
          text: "查看",
          clickFn() {
            const target = self.$refs.detailRef;
            target.visible = true;
            target.getDetailFn(row.userId);
          },
        },
        {
          text: "修改",
          clickFn() {
            const target = self.$refs.editRef;
            target.visible = true;
            target.getDetailFn(row.userId);
          },
        },
        {
          text: "删除",
          clickFn() {
            self
              .$confirm(
                "删除后，账号将无法使用！是否确定删除该账号？",
                "警告",
                {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning",
                }
              )
              .then(() => {
                self.deleteFn(row.userId);
              })
              .catch(() => {});
          },
        },
      ];

      return arr;
    },
    handleSizeChange(val) {
      this.page.size = val;
      this.searchFn(true);
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.searchFn();
    },
    deleteFn(userId) {
      api
        .deleteUser(userId)
        .then(() => {
          this.$message.success("删除成功");
          this.searchFn(true);
          return;
        })
        .catch((err) => {
          console.error(err);
          this.$message.error("删除失败");
        });
    },
    getDictFn(dicCode) {
      const params = {
        dicCode,
      };
      return new Promise((resolve, reject) => {
        api.getDict(params).then((res) => {
          const { data } = res;
          const opts = (data || []).map((item) => ({
            value: item.itemCode,
            label: item.itemValue,
          }));
          resolve(opts);
        });
      });
    },
    getCorFn(val) {
      const obj = this.opts.carNoColor.find((item) => item.value === val);
      return obj ? obj.label : "--";
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap-vehicle {
  height: 100%;
  display: flex;
  > .content {
    flex: 5;
    min-width: 100px;
    display: flex;
    flex-direction: column;
    > .inner-con {
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
}
</style>