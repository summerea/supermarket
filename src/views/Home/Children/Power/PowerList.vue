<template>
  <div class="powerList">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/home/roles'}">角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table :data="powerList" style="width: 100%">
        <el-table-column label="#" type="index" width="150px"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level==='0'" effect="dark">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level==='1'" effect="dark">二级</el-tag>
            <el-tag type="danger" v-else-if="scope.row.level==='2'" effect="dark">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
  </div>
</template>

<script>
import { getPowerList } from "../../../../apis/power";
export default {
  data() {
    return {
      show: "",
      powerList: []
    };
  },
  methods: {},
  mounted() {
    this.show = () => {
      getPowerList().then(res => {
        // console.log(res);
        if (res.meta.status === 200) {
          this.powerList = res.data;
        }
      });
    };
    this.show();
  }
};
</script>

<style scoped lang="scss">
.powerList {
  width: 100%;
  .el-card {
    margin-top: 30px;
  }
  .el-pagination {
    margin-top: 15px;
  }
}
</style>