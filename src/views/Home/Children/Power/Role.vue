<template>
  <div class="role">
    <!-- 角色列表 -->
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/home/rights'}">权限列表</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="primary">添加角色</el-button>
      </div>
      <el-table :data="roleList" style="width: 100%">
        <el-table-column type="expand" width="100px">

          <template slot-scope="scope">
          <pre>
              {{scope.row}}
          </pre>
          </template>

        </el-table-column>
        <el-table-column label="#" type="index" width="150px"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="300">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <el-button type="warning" icon="el-icon-warning" size="mini">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getRolesList } from "../../../../apis/power";
export default {
  data() {
    return {
      roleList: []
    };
  },
  mounted() {
    getRolesList().then(res => {
      // console.log(res)
      if (res.meta.status === 200) {
        this.roleList = res.data;
      }
    });
  }
};
</script>

<style scoped lang="scss">
.role {
  width: 100%;
  .box-card{
    margin-top: 30px;
  }
}
</style>