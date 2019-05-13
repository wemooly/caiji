<template>
  <div class="projectList">
    <Header></Header>
    <div class="bg-w c-mt20">
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="23">
          <div class="grid-content pd-main pt20 pb20">
            <!--搜索全部项目-->
            <el-row class="proList-top">
              <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
                <div class="grid-content">
                  <h2 class="h2 project-cap">
                    <strong class="bt-border">项目</strong>
                    <strong>列表</strong>
                    <span class="translate">PROJECT MANAGEMENT</span>
                  </h2>
                </div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="18">
                <div class="grid-content">
                  <div class="c-search fr">
                    <el-input
                      class="c-input"
                      v-model="search"
                      placeholder="请输入项目名称"
                    >
                      <el-button
                        slot="append"
                        icon="el-icon-search"
                      ></el-button>
                    </el-input>
                  </div>
                  <el-button
                    type="primary"
                    class="fr"
                    @click="dialogFormVisible = true"
                    round
                    >添加</el-button
                  >
                </div>
              </el-col>
            </el-row>
          </div>

          <!-- 添加项目的模态框 -->
          <el-dialog title="添加项目" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form" @submit.native.prevent>
              <el-form-item
                label="项目名称"
                :label-width="formLabelWidth"
                prop="name"
                :rules="[{ required: true, message: '项目名称不能为空' }]"
              >
                <el-input
                  v-model.trim="form.name"
                  autocomplete="off"
                  @keyup.enter.native="addProject"
                ></el-input>
              </el-form-item>
              <!-- <el-form-item label="项目头像" :label-width="formLabelWidth">
                        <el-upload
                          class="upload-demo"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          >
                          <el-button size="small" type="primary">点击上传</el-button>
                          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
              </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addProject">确 定</el-button>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col
          :xs="22"
          :sm="22"
          :md="22"
          :lg="22"
          :xl="23"
          v-if="paginationProject.length > 0"
        >
          <div class="grid-content pd-main pt20 pb20">
            <!--项目列表-->
            <el-row class="bt40">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div
                  class="pj-all-list mb20"
                  v-for="project in paginationProject"
                  :key="project.projectId"
                >
                  <div class="pj-top-bg">
                    <img
                      class="hover-bg"
                      src="./../assets/image/h-4.jpg"
                      width="100%"
                      height="100%"
                    />
                    <div
                      class="pj-door"
                      @click="
                        $router.push(`/index?projectId=${project.projectId}`)
                      "
                    >
                      <img class="pj-img" src="./../assets/image/h-4.jpg" />
                      <div class="operation">
                        <el-button>
                          <span class="icon iconfont icon-zhiding"></span>
                        </el-button>

                        <!-- 点击弹出模块框 指派用户 -->
                        <el-button
                          type="text"
                          @click.stop="
                            (dialogTableVisible = true),
                              putProjectId(project.projectId)
                          "
                        >
                          <span class="icon iconfont icon-bianji"
                            >指派用户</span
                          >
                        </el-button>
                        <!--<el-button v-if="checkBtnPermission('projectManage:delete',proTop.projectId)">-->
                        <!--<span class="icon iconfont icon-shanchu" @click="deleter(proTop.projectId)"></span></el-button>-->
                      </div>

                      <div class="pj-info">
                        <div class="pj-logo">
                          <img src="./../../static/tubiao.png" />
                        </div>
                        <div class="introduce">
                          <h2>{{ project.projectName }}</h2>
                          <br />
                          <span class="goMonitor">查看详情 →</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 指派用户的模态框 -->
                <el-dialog
                  @opened="opened()"
                  title="项目权限管理"
                  :visible.sync="dialogTableVisible"
                >
                  <el-table
                    ref="multipleTable"
                    :data="allUser"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column
                      prop="userId"
                      label="userId"
                    ></el-table-column>
                    <el-table-column
                      prop="loginAccount"
                      label="用户名称"
                    ></el-table-column>
                  </el-table>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogTableVisible = false"
                      >取 消</el-button
                    >
                    <el-button type="primary" @click="assignUser"
                      >确 定</el-button
                    >
                  </div>
                </el-dialog>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <h2 v-else>暂无项目</h2>
      </el-row>
    </div>
    <!-- 分页 -->
    <div class="block" v-if="paginationProject.length > 0">
      <el-pagination
        :current-page.sync="currentPage"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        layout="total,sizes,prev, pager, next"
        :page-sizes="[5, 10, 20]"
        :total="projects.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import {
  reqGetProjectList,
  reqAddProject,
  reqAssignUser,
  reqAllUser,
  reqHasUser
} from "@/api";
import { mapActions } from "vuex";
import Header from "@/views/layout/header.vue";
export default {
  name: "projectList",
  data() {
    return {
      projects: [], //用户可见的项目列表
      pageSize: 5, // 分页每一页显示的个数
      currentPage: 1, // 当前页
      idArr: [], // 指派权限暂时存放已选择的用户 的id 数组
      n: 1, //  暂存 项目的id
      allUser: [], // 所有用户的数据列表
      hasUser: [], // 项目下有权限的用户 数据
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "" //新增项目的名称
      },
      formLabelWidth: "150px", //表的宽度
      search: "" //搜索项目的关键字
    };
  },
  methods: {
    ...mapActions(["LogOut"]),
    // 传递点击的到底是哪一个项目id 动态的渲染数据
    putProjectId(item) {
      this.n = item;
      const result1 = reqAllUser();
      const result2 = reqHasUser({ projectId: this.n });
      Promise.all([result1, result2]).then(res => {
        console.log(res, 10030020302);
        if (res[0].repCode == "0000") {
          this.allUser = res[0].repData;
        }
        if (res[1].repCode == "0000") {
          this.hasUser = res[1].repData;
        }
      });
    },
    // 获取所有 用户数据和 有权限的
    // 模态框打开之后的回调函数   设置默认选中
    opened() {
      // 处理权限用户数组在全用户数组中的位置
      var indexArr = [];
      for (let i = 0; i < this.hasUser.length; i++) {
        this.allUser.forEach((item, index) => {
          if (this.hasUser[i].userId == item.userId) {
            indexArr.push(index);
          }
        });
      }
      console.log(indexArr);
      indexArr.forEach(item => {
        this.$refs.multipleTable.toggleRowSelection(this.allUser[item]);
      });
    },
    // 处理多选框的 的值
    handleSelectionChange(val) {
      this.idArr = [];
      console.log(val);
      val.forEach(item => {
        this.idArr.push(item.userId);
      });
    },
    // 点击 确认按钮 进行指定用户操作
    assignUser() {
      let data = {
        projectId: this.n,
        assignerUserIds: this.idArr.join(",")
      };
      console.log(data, 808080);
      reqAssignUser(data).then(res => {
        console.log(res);

        if (res.repCode == "0000") {
          this.$message({
            message: "指派用户权限成功",
            type: "success"
          });
        }
      });
      this.dialogTableVisible = false;
    },
    // 获取所有的项目列表
    getProjectList() {
      let userId = this.$store.getters.accessUser.userId;
      console.log(userId, 990);
      reqGetProjectList().then(res => {
        console.log(res);
        if (res.repCode == "0000") {
          this.projects = res.repData.projectVOList;
        }
      });
    },
    //  新增项目
    addProject() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let addData = { projectName: this.form.name };
          reqAddProject(addData).then(res => {
            console.log(res, 9098989);
            if (res.repCode === "0000") {
              this.$message({
                message: "恭喜你,新增项目成功",
                type: "success"
              });
              this.getProjectList();
              this.dialogFormVisible = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    //  前端退出
    logOut() {
      this.$confirm("确定退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.LogOut().then(() => {
            this.$message({
              type: "success",
              message: "退出成功!"
            });
          });
        })
        .catch(() => {});
    },
    // 处理分页
    handleSizeChange(val) {
      this.pageSize = val;
    }
  },
  created() {
    this.getProjectList();
  },
  computed: {
    // 动态计算出 现在该显示哪些个
    paginationProject() {
      return this.projects
        .filter(item => {
          return item.projectName.includes(this.search);
        })
        .slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
    }
  },
  components: {
    Header
  }
};
</script>

<style scoped lang="less">
@colore666: #666;
@import "../assets/theme";
.bg-w {
  padding-top: 50px;
}
/deep/.proList-top {
  margin: 40px 0;
  text-align: left;
  .el-icon-search:before {
    content: "\E619";
    font-size: 18px;
    color: #66b1ff;
  }
  .c-search {
    margin-left: 15px;
  }
}

/deep/.block {
  margin-bottom: 20px;
  font-size: 18px;
  overflow: hidden;
  margin-bottom: 30px;
  .el-pagination {
    float: right;
    margin-right: 40px;
    .el-pagination__sizes {
      float: right;
      .el-input__inner {
        border-radius: 15px;
      }
    }
  }
}
/deep/.pd-main {
  .el-dialog {
    width: 40%;
    .el-dialog__body {
      height: 400px;
      overflow: auto;
      .el-table td {
        padding: 7px 0;
      }
    }
  }
}

//顶部信息
.title-bar {
  height: 30px;
  background: #292929;
  .icon_btn {
    line-height: 30px;
    color: #eee;
  }
  .logo {
    width: 200px;
    color: #00d8ed;
    text-align: left;
    line-height: 30px;
    cursor: pointer;
    span {
      color: #fff;
      font-size: 13px;
    }
  }
}

.pb40 {
  padding-bottom: 40px;
}
.el-carousel__item {
  background-color: #203160;
}
.el-carousel {
  top: -1px;
}
/*置顶*/
.mt-30 {
  margin-top: -30px;
}
.box-shadow {
  box-shadow: 0 0 10px 0 rgba(122, 177, 249, 0.34);
  margin-top: -12vh;
  position: relative;
  z-index: 10;
  background: #fff;
}
.pj-top-list,
.pj-all-list {
  position: relative;
  width: 25%;
  float: left;
  overflow: hidden;
  .hover-bg {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    transition: all 0.6s cubic-bezier(0.1, -0.6, 0.25, 0.22);
  }
  .pj-top-bg {
    width: 100%;
    height: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100px auto;
    .pj-door {
      background: #fff;
      padding: 12% 0;
      width: 100%;
      text-align: center;
      color: @gray;
      position: relative;
      .pj-img {
        width: 180px;
        height: 180px;
        display: block;
        margin: 0 auto;
        border-radius: 100%;
        opacity: 1;
      }
      .operation {
        position: absolute;
        z-index: 100;
        right: 25px;
        top: 25px;
        display: none;
        button {
          background: none;
          border: 0;
          padding: 0;
          color: @white;
        }
      }
      .pj-info {
        cursor: pointer;
        position: relative;
        z-index: 1;
        width: 100%;
        .pj-logo {
          position: absolute;
          left: 0;
          right: 0;
          margin-left: auto;
          margin-right: auto;
          bottom: 120px;
          display: none;
          width: 90px;
          height: 90px;
          img {
            width: 100%;
            display: block;
            margin: 0 auto;
          }
        }
        .introduce {
          h2 {
            font-size: 22px;
            padding: 45px 0 10px 0;
            letter-spacing: 2px;
          }
          p {
            font-size: 14px;
            line-height: 24px;
          }
          .goMonitor {
            cursor: pointer;
            color: @white;
            font-size: 14px;
            display: none;
          }
        }
      }
    }
  }
}
.pj-all-list {
  box-shadow: 0 0 10px 0 rgba(122, 177, 249, 0.34);
  /*width: 19% !important;*/
  // margin-left: 0.5%;
  // margin-right: 0.5%;
  .pj-door {
    .pj-info {
      .introduce {
        .goMonitor {
          color: @white;
          line-height: 35px;
          border-radius: 50px;
          width: 110px;
          height: 35px;
          display: block;
          margin: 0 auto;
          border: 1px solid @white;
        }
      }
    }
  }
}
.pj-top-list:hover,
.pj-all-list:hover {
  .hover-bg {
    opacity: 0.2;
  }
  .pj-top-bg {
    background: rgba(122, 177, 249, 1);
    transition: all 3s cubic-bezier(0.58, -0.6, 0.25, 0.22);
    .pj-door {
      background: rgba(122, 177, 249, 1);
      .pj-img {
        opacity: 0;
      }
      .operation {
        display: block;
      }
      .pj-info {
        .pj-logo {
          display: block;
          -webkit-transform-origin: center center;
          transform-origin: center center;
          -webkit-animation: animations 0.5s infinite ease-in-out;
          animation: animations 0.5s infinite ease-in-out;
          animation-iteration-count: 1;
        }
        .introduce {
          h2 {
            margin-top: -60px;
            color: @white;
          }
          p {
            color: @white;
          }
          .goMonitor {
            margin-top: 20px;
            margin-bottom: 5px;
            line-height: 35px;
            display: block;
          }
        }
      }
    }
  }
}
.pj-all-list:hover {
  .pj-top-bg {
    .pj-door {
      .pj-info {
        .introduce {
          .goMonitor {
            margin-top: 10px;
            margin-bottom: 13px;
            line-height: 35px;
            display: block;
          }
        }
      }
    }
  }
}
@media screen and(max-width: 1920px) {
  .pj-top-list {
    width: 25%;
    .pj-top-bg {
      .pj-door {
        .pj-img {
          width: 180px;
          height: 180px;
        }
      }
    }
  }
  .pj-all-list {
    width: 20%;
  }
}
@media screen and(max-width: 1366px) {
  .box-shadow {
    margin-top: -39vh;
  }
  .pj-top-list {
    width: 25%;
    .pj-top-bg {
      .pj-door {
        .pj-img {
          width: 160px;
          height: 160px;
        }
        .pj-info {
          .pj-logo {
            bottom: 130px;
          }
        }
      }
    }
  }
  .pj-all-list {
    width: 25%;
  }
  .pj-all-list:hover {
    .pj-top-bg {
      .pj-door {
        .pj-info {
          .pj-logo {
            bottom: 130px;
          }
          .introduce {
            h2 {
              margin-top: -60px;
            }
            .goMonitor {
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
}
@media screen and(max-width: 1200px) {
  .pj-top-list {
    width: 25%;
    .pj-top-bg {
      .pj-door {
        .pj-img {
          width: 120px;
          height: 120px;
        }
        .pj-info {
          .introduce {
            h2 {
              font-size: 22px;
              padding: 50px 0 10px 0;
              letter-spacing: 2px;
            }
          }
        }
      }
    }
  }
  .pj-all-list {
    width: 33.33%;
  }
}
@media screen and(max-width: 980px) {
  .pj-top-list {
    width: 50%;
    max-height: 285px;
    .pj-top-bg {
      .pj-door {
        .pj-img {
          width: 110px;
          height: 110px;
        }
      }
    }
  }
  .pj-all-list {
    width: 50%;
  }
}
@media screen and(max-width: 670px) {
  .pj-top-list {
    width: 100%;
    .pj-top-bg {
      .pj-door {
        .pj-img {
          width: 150px;
          height: 150px;
        }
      }
    }
  }
  .pj-all-list {
    width: 100%;
  }
}
@keyframes mymove {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-webkit-keyframes mymove /*Safari and Chrome*/ {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-webkit-keyframes animations {
  0% {
    opacity: 0;
    width: 20px;
  }
  100% {
    opacity: 1;
    width: 90px;
  }
}
@keyframes animations {
  0% {
    opacity: 0;
    width: 20px;
  }
  100% {
    opacity: 1;
    width: 90px;
  }
}
/*项目列表*/
.c-input {
  text-align: center;
}
/*列表标题*/
.project-cap {
  font-size: 28px;
  color: @color333;
  font-weight: bold;
  .bt-border {
    border-bottom: 3px solid #7ab1f9;
    padding: 10px 0;
  }
  .translate {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #7ab1f9;
    text-align: center;
  }
}

/*项目列表*/
.porgect-list-shadow {
  // box-shadow: 0 0 10px 0 rgba(122, 177, 249, 0.34);
  background: @white;
}
</style>

