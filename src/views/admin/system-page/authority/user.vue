<template>
  <div class="wrap-user">
    <AsideCom
      ref="asideRef"
      v-model="form.deptIdEquals"
      @change="searchFn(true)"
    ></AsideCom>

    <div class="content">
      <c-section-item>
        <c-filter @keydown.enter.native="searchFn">
          <c-filter-item label="用户名" style="width: 33.3%">
            <el-input
              v-model="form.usernameLike"
              placeholder="请输入用户名"
              style="width: 100%"
              clearable
            ></el-input>
          </c-filter-item>
          <c-filter-item label="姓名" style="width: 33.3%">
            <el-input
              v-model="form.nameLike"
              placeholder="请输入姓名"
              style="width: 100%"
              clearable
            ></el-input>
          </c-filter-item>
          <c-filter-item label="手机" style="width: 33.3%">
            <el-input
              v-model="form.mobileLike"
              placeholder="请输入手机号"
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

      <c-section-item class="inner-con">
        <div class="info">
          <el-button type="primary" icon="el-icon-plus" @click="createFn"
            >新增</el-button
          >
        </div>

        <div class="table-box">
          <c-table :data="tableData">
            <el-table-column prop="username" label="用户名"> </el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="mobile" label="手机"></el-table-column>
            <el-table-column prop="email" label="电子邮件"></el-table-column>
            <el-table-column
              prop="lastLogin"
              label="最后登录时间"
            ></el-table-column>
            <el-table-column label="操作" width="180">
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

    <!-- create dialog -->
    <Create ref="createRef" @success="searchFn(true)"></Create>
    <!-- detail dialog -->
    <Detail ref="detailRef"></Detail>
    <!-- edit dialog -->
    <Edit ref="editRef" @success="searchFn"></Edit>
    <!-- changePwd dialog -->
    <ChangePwd ref="pwdRef"></ChangePwd>
  </div>
</template>

<script>
import AsideCom from "./user-components/Aside.vue";
import api from "@/apis/system";
import Create from "./user-components/Create.vue";
import Detail from "./user-components/Detail.vue";
import Edit from "./user-components/Edit.vue";
import ChangePwd from "./user-components/changePwd.vue";

export default {
  components: {
    AsideCom,
    Create,
    Detail,
    Edit,
    ChangePwd,
  },
  data() {
    return {
      form: {
        deptIdEquals: "",
        usernameLike: "",
        nameLike: "",
        mobileLike: "",
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
    this.searchFn();
  },
  methods: {
    searchFn(resetPage = false) {
      if (resetPage) this.page.current = 1;

      const params = this.getParamsFn();
      api.userList(params).then((res) => {
        const { recordsTotal, data } = res;
        this.tableData = data || [];
        this.page.total = recordsTotal || 0;
      });
    },
    getParamsFn() {
      const {
        form,
        page: { current, size },
      } = this;

      return {
        page: current,
        size,
        sort: "user_id",
        ...form,
      };
    },
    resetFn() {
      this.form = {
        deptIdEquals: "",
        usernameLike: "",
        nameLike: "",
        mobileLike: "",
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
          text: "详情",
          clickFn() {
            const target = self.$refs.detailRef;
            target.visible = true;
            target.getDetailFn(row.userId);
          },
        },
      ];

      if (row.adminFlag === "0") {
        arr.push(
          {
            text: "修改密码",
            clickFn() {
              const target = self.$refs.pwdRef;
              target.visible = true;
              target.initCurrentFn(row);
            },
          },
          {
            text: "编辑",
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
          }
        );
      }

      if (row.adminFlag === "0" && row.lockStatus) {
        arr.push({
          text: "解锁",
          clickFn() {
            self.$message.warning("功能未实现");
          },
        });
      }

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
  },
};
</script>

<style lang="scss" scoped>
.wrap-user {
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