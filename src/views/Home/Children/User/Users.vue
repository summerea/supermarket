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
              <el-form-item label="密码" prop="password">
                <el-input v-model="userForm.password" type="password"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="userForm.email"></el-input>
              </el-form-item>
              <el-form-item label="电话号码" prop="mobile">
                <el-input v-model="userForm.mobile"></el-input>
              </el-form-item>
            </el-form>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="noUsers">取 消</el-button>
            <el-button type="primary" @click="addUsers">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 编辑用户对话框 -->
        <el-dialog title="编辑用户" :visible.sync="editDialog" width="30%">
          <span>
            <el-form ref="editForm" :model="editForm" label-width="80px" :rules="editFormRules">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="editForm.username" disabled></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="editForm.email"></el-input>
              </el-form-item>
              <el-form-item label="电话号码" prop="mobile">
                <el-input v-model="editForm.mobile"></el-input>
              </el-form-item>
            </el-form>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="noEdit">取 消</el-button>
            <el-button type="primary" @click="addEdit">确 定</el-button>
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
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="removeUsers(scope.row.id)"
              ></el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="设置" placement="top">
              <el-button size="mini" type="warning" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
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
import {
  getUsersList,
  changeStatus,
  addUsers,
  addEdit,
  sureEdit,
  deleteUsers
} from "../../../../apis/user";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else {
        let reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确邮箱"));
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else {
        let regPhone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (!regPhone.test(value)) {
          callback(new Error("请输入正确手机号"));
        }
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else {
        let reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确邮箱"));
        }
        callback();
      }
    };
    var validatePass4 = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else {
        let regPhone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (!regPhone.test(value)) {
          callback(new Error("请输入正确手机号"));
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
      editDialog: false,
      userForm: {
        username: "",
        email: "",
        mobile: "",
        password: ""
      },
      editForm: {},
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
            validator: validatePass,
            trigger: "blur"
          }
        ],
        mobile: [
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3到 20 个字符", trigger: "blur" }
        ]
      },
      editFormRules: {
        email: [
          {
            validator: validatePass3,
            trigger: "blur"
          }
        ],
        mobile: [
          {
            validator: validatePass4,
            trigger: "blur"
          }
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
      //发送请求
      addUsers(this.userForm).then(res => {
        console.log(res);
        if (res.meta.status == 201) {
          this.dialogstatus = false;
          this.$message({
            type: "success",
            message: "创建成功！！！",
            duration: 500
          });
          this.$refs.userForm.resetFields();
          this.show();
        } else {
          this.$message({
            type: "warning",
            message: "创建失败！！！",
            duration: 500
          });
          this.dialogstatus = true;
        }
      });
    },
    noUsers() {
      this.$refs.userForm.resetFields();
      this.dialogstatus = false;
    },
    edit(editId) {
      // console.log(editId);
      this.editDialog = true;
      addEdit(editId).then(res => {
        // console.log(res);
        if (res.meta.status === 200) {
          this.editForm = res.data;
        }
      });
    },
    addEdit() {
      sureEdit(this.editForm.id, {
        email: this.editForm.email,
        mobile: this.editForm.mobile
      }).then(res => {
        if (res.meta.status === 200) {
          this.editDialog = false;
          this.$message({
            type: "success",
            message: "更新成功",
            duration: 500
          });
        } else {
          this.$message({
            type: "error",
            message: "更新失败",
            duration: 500
          });
        }
      });
    },
    noEdit() {
      this.editDialog = false;
    },
    removeUsers(userId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUsers(userId).then(res => {
            // console.log(res)
            if (res.meta.status === 200) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.show()
            } else {
              this.$message({
                type: "warning",
                message: "删除失败"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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