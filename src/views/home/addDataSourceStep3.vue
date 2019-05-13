<template>
  <div class="map">
    <el-container>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main class="mt30">
          <el-row>
            <el-col :span="20" :offset="4">
              <div class="content">
                <Steps :index="active"></Steps>
              </div>
            </el-col>
            <el-col :span="22" :offset="1" style="padding-bottom:70px">
              <div class="content mt10">
                <el-row :gutter="10">
                  <el-col :span="4">
                    <div class="li_card-box">
                      <div class="li_card-box_lid">
                        同步列表
                        <el-button
                          class="hidden_btn lh32 fr"
                          @click="showModel"
                        >
                          请选择
                          <i class="icon iconfont icon-bianji"></i>
                        </el-button>
                      </div>
                      <div class="li_card-content min-h">
                        <!--已有 任务列表 -->
                        <el-menu
                          :default-active="activeIndex"
                          class="el-menu-demo"
                        >
                          <el-menu-item
                            :index="i.toString()"
                            v-for="(item, i) in checkList"
                            :key="i"
                            @click="getEtaskInfo(item.etaskId)"
                            >{{ item.sourceTableName }}</el-menu-item
                          >
                        </el-menu>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="20">
                    <div class="li_card-box">
                      <div class="li_card-box_lid">
                        <el-row>
                          <div>
                            <el-col :span="12">
                              <span class="tab_name fl">数据源</span>
                              <span class="ml10">{{
                                etaskInfo.sourceTableName
                              }}</span>
                              <div class="cut-off fr">
                                <span>&nbsp;</span>
                              </div>
                            </el-col>
                            <el-col :span="11">
                              <span class="tab_name fl ml18">数据目的地</span>
                              <el-form
                                ref="form"
                                :model="etaskInfo"
                                label-width="140"
                                class="demo-ruleForm li_input2 fl ml10"
                                :inline="true"
                              >
                                <el-form-item label="目的地表名称:" class="fl">
                                  <el-input
                                    v-model="etaskInfo.destinationTableName"
                                    placeholder="请输入内容"
                                  ></el-input>
                                </el-form-item>
                              </el-form>
                            </el-col>
                          </div>
                        </el-row>
                      </div>
                      <div class="li_card-content">
                        <div class="tab_lid">
                          <el-row>
                            <div>
                              <el-col :span="2" v-if="ejobInfo.isIncrease"
                                >增量识别</el-col
                              >
                              <el-col :span="2" v-else>&nbsp;</el-col>
                              <el-col :span="3">字段名称</el-col>
                              <el-col :span="3">类型</el-col>
                              <el-col :span="2">长度</el-col>
                              <el-col :span="2">
                                Not Null
                                <div class="cut-off fr">
                                  <span>&nbsp;</span>
                                </div>
                              </el-col>
                              <el-col :span="5">字段名称</el-col>
                              <el-col :span="3">类型</el-col>
                              <el-col :span="1">&nbsp;</el-col>
                            </div>
                          </el-row>
                        </div>
                        <div class="tab_list">
                          <div
                            class="tab_list-tr"
                            v-for="(item, index) in etaskInfo.etaskRuleVOList"
                            :key="index"
                          >
                            <el-row>
                              <!-- 左边部分 -->
                              <el-col :span="2" v-if="ejobInfo.isIncrease">
                                <el-tooltip
                                  content="唯一键"
                                  placement="top"
                                  class="ml-20"
                                  v-if="item.isPrimaryKey"
                                >
                                  <el-button class="hidden_btn">
                                    <i class="icon iconfont icon-yuechi1"></i>
                                  </el-button>
                                </el-tooltip>
                                <el-radio
                                  v-model="radio"
                                  :label="item.columnName"
                                  >{{ index + 1 }}</el-radio
                                >
                              </el-col>
                              <el-col :span="2" v-else>&nbsp;</el-col>
                              <el-col :span="3">{{ item.columnName }}</el-col>
                              <el-col :span="3">{{ item.columnType }}</el-col>
                              <el-col :span="2">{{
                                item.columnLength == 0
                                  ? "&nbsp;"
                                  : item.columnLength
                              }}</el-col>
                              <el-col :span="2">
                                <el-checkbox
                                  v-model="item.isNull"
                                  disabled
                                ></el-checkbox>
                                <div class="cut-off fr">
                                  <span class="correspond">
                                    <i
                                      class="icon iconfont icon-yuandianxiao"
                                    ></i>
                                  </span>
                                  <span class="direction">
                                    <i class="icon iconfont icon-jiantou2"></i>
                                  </span>
                                </div>
                              </el-col>

                              <!-- 右边部分 -->
                              <el-col :span="5">
                                <el-form
                                  ref="form"
                                  :model="item"
                                  label-width="140"
                                  class="demo-ruleForm li_input2"
                                  :inline="true"
                                  v-if="item.isDestinationColumn"
                                >
                                  <el-form-item label class="fl">
                                    <el-input
                                      v-model="item.columnName"
                                      placeholder="请输入内容"
                                      readonly
                                    ></el-input>
                                  </el-form-item>
                                </el-form>
                                <el-button
                                  type="text"
                                  v-else
                                  @click="recoverRule(index)"
                                  >恢复字段</el-button
                                >
                              </el-col>
                              <el-col :span="3">
                                <el-select
                                  v-model="item.destinationColumnType"
                                  placeholder="请选择"
                                  class="li_input2"
                                  v-if="item.isDestinationColumn"
                                >
                                  <el-option
                                    v-for="(item1,
                                    index) in etaskInfo.destinationDatatypes"
                                    :key="index"
                                    :label="item1"
                                    :value="item1"
                                  ></el-option>
                                </el-select>
                              </el-col>
                              <el-col :span="1" v-if="item.isDestinationColumn">
                                <el-button
                                  class="hidden_btn"
                                  @click="delRule(index)"
                                >
                                  <i class="icon iconfont icon-lajitong"></i>
                                </el-button>
                              </el-col>
                            </el-row>
                          </div>
                          <div class="tab_list-tr" style="text-align:center">
                            <el-form
                              ref="form"
                              :model="{}"
                              label-width="180"
                              class="demo-ruleForm li_input2"
                              :inline="true"
                            >
                              <el-form-item label="数据读取条件：where">
                                <el-input
                                  v-model="filterWord"
                                  placeholder="请输入内容"
                                ></el-input>
                              </el-form-item>
                              <el-button
                                type="success"
                                round
                                size="small"
                                @click="saveEtaskSet"
                                >保存当前设置</el-button
                              >
                            </el-form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="footer_bg">
              <el-footer>
                <el-row :gutter="20">
                  <el-col :span="8" :offset="8">
                    <el-button round @click="backStep" type="danger " class="fl"
                      >上一步</el-button
                    >
                    <el-button round @click="commit" type="primary" class="fl"
                      >去激活</el-button
                    >
                  </el-col>
                </el-row>
              </el-footer>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
    <!-- <Modal ref="Modal" v-show="dialogFormVisible" statusText="选择同步内容" @closeModal="closeModal" contentText="index.vue" @button="closeModal" alert="1">
      <SynchronizeContent></SynchronizeContent>
    </Modal>-->
    <!-- 编辑表的模态框 -->
    <el-dialog
      title="请选择同步内容"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-checkbox-group v-model="selectTables">
        <!-- <el-checkbox v-for="(SourceTable,i) in SourceTables" :key="i" v-model="SourceTable.isChoose">
                {{SourceTable.tableName}}
        </el-checkbox>-->
        <el-checkbox
          v-for="(SourceTable, i) in SourceTables"
          :label="SourceTable.tableName"
          :key="i"
          :checked="SourceTable.isChoose"
          >{{ SourceTable.tableName }}</el-checkbox
        >
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveEtaskList">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Header from "@/views/layout/header.vue";
import leftBar from "@/views/layout/leftBar.vue";
import Steps from "@/views/home/Steps.vue";

import {
  reqGetEtaskList,
  reqEtasks,
  reqSaveEtaskList,
  reqEtaskInfo,
  reqUpdateEtask
} from "@/api";
export default {
  name: "addDataSourceStep2",
  data() {
    return {
      checkList: [], // 作业下任务列表
      SourceTables: [], // 数据源所有的表清单
      selectTables: [], // 已选中的表数组
      etaskInfo: {}, // 任务信息对象
      active: 2, //步骤条哪个高亮
      activeIndex: "0", // 列表默认高亮度的第一个
      etaskId: "", //  用来临时保存点击的哪一个任务的 etaskid值
      filterWord: "", // 手动输入的搜索的where条件
      radio: "", // 增量标识变量
      dialogFormVisible: false, // 加载页面默认显示弹出框
      ejobInfo: {}
    };
  },
  components: {
    Header,
    leftBar,
    Steps
  },
  computed: {},
  methods: {
    // 最后的 去激活
    commit() {
      const { ejobId, projectId } = this.ejobInfo;
      // this.$router.push("/Details?ejobId="+ejobId);
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
        // 1秒之后再跳转
        this.$router.push({
          name: "Details",
          query: {
            ejobId: ejobId,
            projectId: projectId
          }
        });
      }, 500);
    },
    // 返回上一步的方法
    backStep() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
        this.$router.back();
      }, 400);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    closeModal() {
      this.dialogFormVisible = false;
    },
    showModel() {
      // 点击弹出模态框 重新调用数据同步任务清单
      this.dialogFormVisible = true;
      this.getEtaskList();
    },
    // 单个任务用户手动保存更改的设置
    saveEtaskSet() {
      if (this.ejobInfo.isIncrease && !this.radio) {
        this.$message({
          message: "必须选择一个增量识别",
          type: "warning"
        });
        return false;
      }
      let data = {
        etaskId: this.etaskId,
        destinationTableName: this.etaskInfo.destinationTableName,
        filterWhere: this.filterWord,
        increaseColumnName: this.radio,
        etaskRuleVOList: this.etaskInfo.etaskRuleVOList
      };
      console.log(data, "每个单点的数据");
      reqUpdateEtask(data).then(res => {
        console.log(res, 6000);
        if (res.repCode == "0000") {
          // 请求跟新成功了跳转作业详情页
          this.$message({
            message: "更新任务成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "更新任务失败,请稍后再试",
            type: "error"
          });
        }
      });
    },
    // 读取数据同步任务清单
    getEtaskList() {
      const { ejobId } = this.ejobInfo;
      reqGetEtaskList({ ejobId: ejobId }).then(res => {
        console.log(res, 99999);
        if (res.repCode == "0000") {
          this.SourceTables = res.repData.tableList;
        }
      });
    },
    // 读取作业下任务列表
    getEtasks() {
      // 清空选择
      this.radio = "";
      const { ejobId } = this.ejobInfo;
      reqEtasks({ ejobId: ejobId }).then(res => {
        console.log(res, 90000);
        if (res.repCode == "0000") {
          // 拿出所有的 已选数据的表名
          this.checkList = res.repData.etaskVOList;
          // 读取成功之后  默认展示第一个 etask的信息
          if (this.checkList.length > 0) {
            this.getEtaskInfo(this.checkList[0].etaskId);
          }
        }
      });
    },
    // 保存选择的任务列表
    saveEtaskList() {
      const { ejobId } = this.ejobInfo;
      console.log(this.selectTables, 4343434);
      let data = {
        ejobId: ejobId,
        chooseTableNames: this.selectTables.join(",")
      };
      // 保存 任务列表
      reqSaveEtaskList(data).then(res => {
        console.log(res, 2000);
        if (res.repCode == "0000") {
          //  保存任务需要时间 加点遮罩
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          setTimeout(() => {
            loading.close();
          }, 1500);
          this.getEtasks();
          this.dialogFormVisible = false;
        }else{
          this.$message({
            message: res.repMsg,
            type: "warning"
          });
        }
      });
    },

    // 查看任务信息
    getEtaskInfo(etaskId) {
      // 根据表名来找到etask的id
      console.log(etaskId);
      this.etaskId = etaskId; // 临时存etaskId
      this.filterWord = "";
      reqEtaskInfo({ etaskId: etaskId }).then(res => {
        console.log(res, 5000);
        if (res.repCode == "0000") {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          setTimeout(() => {
            loading.close();
            this.etaskInfo = res.repData.etaskVO;
            // 读取到的增量id 默认显示在界面上
            this.radio = res.repData.etaskVO.increaseColumnName;
            this.filterWord = res.repData.etaskVO.filterWhere;
          }, 400);
        }
      });
    },
    // 删除对应的规格字段
    delRule(index) {
      // 让 vue可以响应这个变动
      // this.$set(this.flag, index, true);     //(arr,index,newvalue)
      this.etaskInfo.etaskRuleVOList[index].isDestinationColumn = false;
    },
    // 恢复对用的规则字段
    recoverRule(index) {
      this.etaskInfo.etaskRuleVOList[index].isDestinationColumn = true;
    }
  },
  created() {
    this.radio = "";
    this.ejobInfo = JSON.parse(localStorage.getItem("ejobInfo") || "{}");
    // 判断用户是不是直接通过网址进入第三步
    if (!this.ejobInfo.ejobId) {
      //说明本地存储中没有存新增返回的数据 要返回第一步
      this.$router.push("/projectList");
    }
    this.getEtaskList();
    this.getEtasks();
  },
  watch: {
    // 监听etask的值变化
    // etaskId(newVal,oldVal){
    //     // console.log("etask值改变触发的函数",newVal,oldVal);
    //     if(newVal == this.checkList[0].etaskId){
    //        return console.log("etaskId等于初始值触发的事件");
    //     }else{
    //        // 监听etask值是否改变 发送跟新请求
    //       let data = {
    //           etaskId: oldVal,
    //           destinationTableName:this.etaskInfo.destinationTableName,
    //           filterWhere:this.filterWord,
    //           increaseRuleId:this.radio,
    //           etaskRuleVOList : this.etaskInfo.etaskRuleVOList
    //        }
    //        console.log(data,"跟新的数据");
    //        reqUpdateEtask(data).then(res=>{
    //           console.log(res,30303030);
    //           if(res.repCode=="0000"){
    //             //请求跟新成功了 什么都不做
    //           }
    //        })
    //     }
    // }
  }
};
</script>

<style scoped lang="less">
//  模态框的样式
/deep/.el-dialog {
  width: 40%;
  text-align: left;
  .el-checkbox {
    box-sizing: border-box;
    width: 50%;
    display: inline-block;
    text-align: left;
    height: 42px;
    line-height: 42px;
    padding: 15px;
    margin: 0;
  }
}

.icon-bianji:before {
  color: #7ab1f9;
}

/deep/.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: #7ab1f9;
}

.min-h {
  min-height: 60vh;
}
.footer_bg .el-footer {
  width: 100%;
  margin-left: -10px;
  background: #ededed;
  padding-top: 10px;
}
.ml-20 {
  margin-left: -20px;
}
.lh32 {
  line-height: 40px;
}
.li_card-content {
  .li_card-input {
    h4 {
      text-align: left;
      font-size: 14px;
    }
  }
  .el-menu-demo {
    margin: 0;
    .el-menu-item,
    .el-submenu__title {
      height: 30px;
      line-height: 30px;
    }
  }
  .el-carousel__container {
    height: 250px;
  }
}
.data_source-list {
  width: 100%;
  padding-bottom: 50px;
  h4 {
    line-height: 40px;
  }
}
.data_source-box {
  width: 180px;
  float: left;
}
.data_source-box.add {
  height: 40px;
  border: 1px solid #5bc0de;
  background: #5bc0de;
  color: #fff;
}
.data_source-box.select {
  height: 38px;
  border: 1px solid #5bc0de;
  color: #5bc0de;
  line-height: 38px;
  border-radius: 50px;
}
.add {
  background: #dd4a68;
  // padding: 5px 20px;
  color: #fff;
  // line-height: 20px;
}
.tab_name {
  padding: 3px 8px;
  font-size: 11px;
  color: #aaa;
  background: #eee;
  border-radius: 50px;
  height: 20px;
  line-height: 20px;
}
.tab_lid {
  line-height: 40px;
  font-size: 12px;
  font-weight: 700;
  background: #fbfbfb;
  .cut-off {
    width: 23px;
    background: #ededed;
    display: block;
    position: relative;
  }
  .el-row div:nth-child(7) {
    margin-left: 10px;
  }
}
.li_card-box_lid {
  .el-row div:nth-child(3) {
    margin-left: 10px;
  }
  .cut-off {
    width: 23px;
    background: #ededed;
    display: block;
    position: relative;
  }
}
.tab_list {
  line-height: 40px;
  font-size: 12px;
  font-weight: 700;
  background: #fff;
  .tab_list-tr {
    border-top: 1px solid #ededed;
    overflow: hidden;
    height: 40px;
    .el-row div:nth-child(7) {
      margin-left: 10px;
    }
    &:hover {
      background: #fffff9;
    }
    .cut-off {
      width: 23px;
      background: #ededed;
      display: block;
      position: relative;
      .correspond {
        position: absolute;
        left: -18px;
        line-height: 45px;
        i.iconfont {
          font-size: 37px;
          color: #5bc0de;
        }
      }
      .direction {
        position: relative;
        right: -8px;
        i.iconfont {
          font-size: 22px;
          color: #5bc0de;
        }
      }
    }
  }
}
</style>
