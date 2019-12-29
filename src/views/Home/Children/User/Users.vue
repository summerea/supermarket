<template>
  <div class="users">
    <el-card class="box-card">
      <div slot="header" class="clearfix cards-header">
        <el-input placeholder="请输入内容" v-model="input" class="cards-input" clearable @clear="search">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
        <el-button type="danger" @click="changeDialogStatus">添加用户</el-button>
        <!-- 添加用户对话框 -->
        <el-dialog title="添加用户" :visible.sync="dialogstatus" width="30%">
          <span>
            <el-form ref="userForm" :model="userForm" label-width="80px" :rules="userFormRules">
              <el-form-item label="姓名" prop="username">
                <el-input v-model="userForm.username"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="userForm.email"></el-input>
              </el-form-item>
              <el-form-item label="电话号码" prop="mobile">
                <el-input v-model="userForm.mobile"></el-input>
              </el-form-item>
              <el-form-item label="角色" prop="role">
                <el-input v-model="userForm.role"></el-input>
              </el-form-item>
            </el-form>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="noUsers">取 消</el-button>
            <el-button type="primary" @click="addUsers">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 表格 -->
      <el-table :data="userList" style="width: 100%" stripe>
        <el-table-column type="index" label="#" width="70"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="switchStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="设置" placement="top">
            <el-button size="mini" type="warning" icon="el-icon-setting"></el-button>
          </el-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.params.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.params.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getUsersList, changeStatus } from "../../../../apis/user";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      input: "",
      total: null,
      userList: [],
      show: "",
      dialogstatus: false,
      userForm: {
        username: "",
        email: "",
        mobile: "",
        role: ""
      },
      queryInfo: {
        params: {
          query: "",
          pagenum: 1,
          pagesize: 5
        }
      },
      userFormRules: {
        username: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        email: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ],
        mobile: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur"
          }
        ],
        role: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      this.queryInfo.params.pagesize = val;
      this.show();
    },
    handleCurrentChange(val) {
      this.queryInfo.params.pagenum = val;
      this.show();
    },
    switchStatus(status) {
      console.log(status);
      changeStatus(status.id, status.mg_state).then(res => {
        console.log(res);
        if (status === 200) {
          this.$message({
            type: "success",
            message: "更新用户状态成功",
            duration: 1000
          });
        } else {
          status.mg_state = !status.mg_state;
          this.$message({
            type: "warning",
            message: "更新用户状态失败",
            duration: 1000
          });
        }
      });
    },
    search() {
      console.log(111);
      this.queryInfo.params.query = this.input;
      this.show();
    },
    changeDialogStatus() {
      this.dialogstatus = !this.dialogstatus;
    },
    addUsers() {
      this.dialogstatus = false;
      //发送请求
    },
    noUsers() {
      this.$refs.userForm.resetFields();
      this.dialogstatus = false;
    }
  },
  mounted() {
    this.show = () => {
      getUsersList(this.queryInfo).then(res => {
        console.log(res);
        const { status } = res.meta;
        if (status === 200) {
          this.userList = res.data.users;
          this.total = res.data.total;
        }
      });
    };
    this.show();
  }
};
</script>

<style lang="scss" scoped>
.users {
  width: 100%;
  .box-card {
    .cards-header {
      display: flex;
    }
    .cards-input {
      margin-right: 20px;
      width: 300px;
    }
  }
}
</style>