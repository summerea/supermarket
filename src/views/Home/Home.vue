<template>
  <div class="home">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div class="header-left">电商管理系统</div>
        <div class="header-right">
          <el-button type="normal" size="mini" @click="clearLogin">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse?'64px':'200px'">
          <div class="handMenu" @click="handMenu">||||</div>
          <!-- 侧边栏 -->
          <!-- @open="handleOpen"
          @close="handleClose"-->
          <el-menu
            router
            :default-active="$route.name"
            class="el-menu-vertical-demo"
            background-color="#f1f1f1"
            text-color="#333"
            active-text-color="#fc577b"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
          >
            <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item
                :index="itemc.path"
                v-for="itemc in item.children"
                :key="itemc.id"
              >{{itemc.authName}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getMenu } from "../../apis/home";
export default {
  components: {},
  data() {
    return {
      menuList: [],
      isCollapse: false
    };
  },
  methods: {
    clearLogin() {
      sessionStorage.clear("token");
      this.$router.replace("/");
    },
    handMenu() {
      this.isCollapse = !this.isCollapse;
    }
  },
  mounted() {
    // console.log(this)
    getMenu().then(res => {
      // console.log(res.data);
      const { status } = res.meta;
      if (status === 200) {
        this.menuList = res.data;
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.home {
  // fa728f
  height: 100%;
  .el-container {
    height: 100%;
    .el-header {
      background: #fc577b !important;
    }
    .el-aside {
      background: #f1f1f1;
      .handMenu {
        background: #f1f1f1;
        text-align: center;
        height: 30px;
        line-height: 30px;
        color: #fff;
      }
      .el-menu {
        border: 0;
        background: #f1f1f1 !important;
        .el-menu-item:active {
          background-color: #fc577b !important;
          color: #fc577b!important;
        }
        .el-menu-item:hover {
          background-color: #fc577b !important;
          color: #f1f1f1 !important;
          box-shadow: 0px 0px 5px #fff;
        }
        .el-menu-item-group__title {
          padding: 0 !important;
        }
      }
    }
    .el-main {
      display: flex;
      flex: 1;
      // height:100%
    }
    .el-header {
      background: #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
