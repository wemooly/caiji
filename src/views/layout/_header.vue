<template>
  <div class="header">
    <el-row>
      <el-col :span="24">
        <div class="title-bar">
        <el-col :span="22" :offset="1">
          <div class="fl logo" @click="$router.push('/projectList')" title="返回项目列表">信息<span> 采集系统</span></div>
          <div class="fr">
            <el-button class="hidden_btn icon_btn">消息</el-button>
            <el-button class="hidden_btn icon_btn" @click="logOut">退出</el-button>
          </div>
        </el-col>
        </div>
      </el-col>
    </el-row>
     <el-row :gutter="20" slot="tabBar">
      <el-col :span="24" class="nav-menu_bar">
          <el-col :span="8" :offset="8">
            <el-menu :default-active="onRoutes" :default-openeds="[$route.path]"
                    class="el-menu-demo" mode="horizontal"
                    @select="handleSelect" background-color="#f5f5f5"
                    text-color="#6e7e8b" active-text-color="#0099cc" router>

                <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name+'?projectId='+projectId" class="fl">
                  <i class="icon iconfont " :class="item.icon"></i>
                  {{ item.navItem }}
                </el-menu-item>
            </el-menu>
          </el-col>
        </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapActions} from "vuex"
    export default {
      name: "header-bar",
      data(){
          return{
            navList: [
              { name: "/index", navItem: "数据任务",icon:"icon-houtaicaozuorizhi-"},
              { name: "/fileSynchronization", navItem: "文件同步",icon:"icon-jiekouwendang-"},
              { name: "/dataManagement", navItem: "数据管理",icon:"icon-jifenquanliebiao-"},
              { name: "/userManagement", navItem: "用户管理",icon:"icon-shanghuhaopeizhi"},
            ],
            projectId:''
          }
      },
      computed:{
        onRoutes () {
          return this.$route.path;
        },
      },
      methods:{
         ...mapActions(["LogOut"]),
        handleSelect (key, keyPath) {
        },
        // 前端登出
          logOut(){
              this.$confirm('确定退出吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.LogOut();
              this.$message({
                type: 'success',
                message: '退出成功!'
              });
            }).catch(() => {
            });
          }
      },
      created() {
          this.projectId =  localStorage.getItem("projectId")
      },
    }
</script>

<style scoped lang="less">
  .title-bar{
    height: 30px;
    background: #292929;
    .icon_btn{
      line-height: 30px;
      color: #eee;
    }
    .logo{
      width: 200px;
      color:#00d8ed;
      text-align: left;
      line-height: 30px;
      cursor:pointer;
      span{
        color: #fff;
        font-size: 13px;
      }
    }
  }
  .nav-menu_bar{
    background: #f5f5f5;
    box-shadow: 1px 1px 1px #eee;
  }

</style>
