<template>
<div class="logBg">
     <div class="login">
    <el-avatar :size="120" src="https://empty">
      <img src="../../assets/images/defaultAator.jpg" />
    </el-avatar>
    <!-- 卡片组件外框 -->

    <el-card class="box-card">
      <!-- 头像 -->

      <!-- 表单组件验证 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="username" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="form-submit">
          <el-button type="danger" @click="submitForm('ruleForm')">提交</el-button>
          <el-button  @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</div>
 
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      let regUser = /^[a-z]\w{4,19}$/;
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (!regUser.test(value)) {
          callback(new Error("请输入5-20位，字母开头"));
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      let regPwd = /^[a-z | A-Z]\w{5,15}$/;
       if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (!regPwd.test(value)) {
          callback(new Error("请输入5-20位,字母加密码"));
        }
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.logBg{
    width: 100%;
    height:100%;
    background: #fa728f;
}
.login {
  width: 420px;
  height: 300px;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .form-submit{
      text-align: right;
  }
  .box-card {
    padding-top: 70px;
    width: 420px;
    height: 300px;
    padding-right: 30px;
    box-sizing: border-box;
  }
  .el-avatar {
    position: absolute;
    top: -60px;
    left: 150px;
    border: 10px solid #fff;
    box-shadow: 0 0 3px 3px #ccc;
  }
}
</style>