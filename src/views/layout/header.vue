<template>
  <div class="nav-menu">
    <el-menu
      :default-active="onRoutes"
      :default-openeds="[$route.path]"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#203160"
      text-color="rgba(255,255,255,0.4)"
      active-text-color="#7AB1F9"
      router
    >
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="23">
          <div class="grid-content pd-main">
            <div class="userBox fr" @click="logOut">
              {{ accessUser.loginAccount }}
              <el-button class="goOut">
                <i class="icon iconfont icon-tuichufffpx"></i>
              </el-button>
            </div>
            <a
              @click="$router.push('/projectList')"
              title="返回项目列表"
              class="fl"
            >
              <img src="./../../assets/image/logo2.jpg" class="logo" alt />
            </a>
            <h2
              class="position-project fl"
              @click="$router.push('/projectList')"
              title="返回项目列表"
            >
              项目 / 信息采集项目
            </h2>
            <div
              class="nav-md fr"
              v-if="$route.path != '/projectList' && $route.path != '/'"
            >
              <div class="menu">
                <el-menu-item
                  v-for="(item, i) in navList"
                  :key="i"
                  :index="item.name"
                  class="fl"
                  >{{ item.navItem }}</el-menu-item
                >
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-menu>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "header-bar",
  data() {
    return {
      navList: [
        {
          name: "/index",
          navItem: "数据任务",
          icon: "icon-houtaicaozuorizhi-"
        },
        {
          name: "/fileSynchronization",
          navItem: "文件同步",
          icon: "icon-jiekouwendang-"
        },
        {
          name: "/dataManagement",
          navItem: "数据管理",
          icon: "icon-jifenquanliebiao-"
        },
        {
          name: "/userManagement",
          navItem: "用户管理",
          icon: "icon-shanghuhaopeizhi"
        }
      ],
      projectId: ""
    };
  },
  computed: {
    ...mapGetters(["accessUser"]),
    onRoutes() {
      return this.$route.path;
    }
  },
  methods: {
    ...mapActions(["LogOut"]),
    handleSelect(key, keyPath) {},
    // 前端登出
    logOut() {
      this.$confirm("确定退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.LogOut();
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {});
    }
  },
  created() {
    this.projectId = localStorage.getItem("projectId");
    this.navList[0].name = "/index?projectId=" + this.projectId;
  }
};
</script>

<style scoped lang="less">
.nav-menu {
  width: 100%;
  background: #203160;
  position: fixed;
  z-index: 1000;
  .logo {
    margin-top: 14px;
    width: 85px;
  }
  .nav-md {
    display: block;
    margin-right: 80px;
  }
  .nav-mini {
    display: block;
  }
}
.el-menu {
  margin: 0px;
  .position-project {
    color: #ddd;
    cursor: pointer;
    position: fixed;
    z-index: 10000;
    top: 24px;
    left: 150px;
    font-size: 16px;
    line-height: 42px;
    margin-left: 15px;
  }
}
.el-menu-item {
  padding: 0;
  margin: 0 15px;
  font-size: 15px;
  line-height: 70px;
}

.el-menu-item.is-active {
  animation: 2s infinite;
  border-top: 6px solid #7ab1f9;
  font-size: 15px;
  color: #7ab1f9;
  font-weight: bold;
  line-height: 59px;
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  border-top: 6px solid #7ab1f9;
  color: #7ab1f9;
  background: none !important;
  line-height: 59px;
}
.el-menu-item:last-child {
  margin-right: 15px !important;
}
.el-menu-item:first-child {
  margin-left: 15px !important;
}
.userBox {
  line-height: 64px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
  cursor: pointer;
  .headerP {
    width: 20px;
    height: 20px;
    display: block;
    border-radius: 100%;
    border: 1px solid #03afff;
    margin-top: 20px;
    margin-right: 10px;
    float: left;
  }
  .goOut {
    padding: 0;
    background: none;
    border: 0;
    color: rgba(255, 255, 255, 1);
    margin-left: 5px;
    .iconfont {
      font-size: 14px;
    }
    &:hover {
      color: #03afff;
    }
  }
}

@media screen and(max-width: 900px) {
  .nav-menu {
    .nav-md {
      display: none;
    }
    .nav-mini {
      display: block;
      span {
        margin-right: -30px;
        color: #fff;
        line-height: 80px;
        float: right;
        position: relative;
        font-size: 36px;
        width: 100px;
        text-align: center;
      }
      .menu {
        display: none;
        width: 100px;
        position: absolute;
        z-index: 1000;
        background: #203160;
        padding: 10px;
        right: 190px;
        top: 70px;
      }
    }
    .nav-mini:hover {
      .menu {
        display: block;
      }
    }
  }
}
</style>
