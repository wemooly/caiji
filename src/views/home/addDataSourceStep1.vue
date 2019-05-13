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
            <el-col :span="22" :offset="1">
              <div class="content mt10">
                <div class="li_card-box">
                  <div class="li_card-box_lid">任务名称</div>
                  <div class="li_card-content li_input">
                    <el-col :span="4">
                      <el-form ref="form" :model="form" label-width="0">
                        <el-form-item
                          label
                          prop="ejobName"
                          :rules="[
                            {
                              required: true,
                              message: '任务名不能为空',
                              trigger: 'blur'
                            },
                            {
                              min: 3,
                              max: 50,
                              message: '长度在3-50字符',
                              trigger: 'blur'
                            }
                          ]"
                        >
                          <el-input
                            v-model.trim="form.ejobName"
                            placeholder="请输入任务名称"
                          ></el-input>
                        </el-form-item>
                      </el-form>
                    </el-col>
                  </div>
                </div>
                <div class="li_card-box mt10">
                  <div class="li_card-box_lid">数据源选择</div>
                  <div class="li_card-content">
                    <div class="li_card-input">
                      <div class="data_source-list fl">
                        <h4>请选择一个数据源</h4>

                        <!-- 新建数据原的模态框 -->
                        <el-button
                          type="text"
                          round
                          class="data_source-box add mr30"
                          @click="newDataSource"
                          >新建数据源</el-button
                        >
                        <template>
                          <el-dialog
                            title="数据源信息"
                            :visible.sync="outerVisible"
                            :close-on-click-modal="false"
                            @close="$refs.DataSource.resetFields()"
                          >
                            <el-form
                              ref="DataSource"
                              :model="DataSource"
                              label-width="150px"
                              class="demo-ruleForm"
                              :disabled="sourceDisabled"
                              :rules="DataSourceRules"
                            >
                              <el-form-item
                                label="数据源类型"
                                prop="sourceType"
                              >
                                <el-select
                                  v-model.trim="DataSource.sourceType"
                                  placeholder="请选择活动区域"
                                >
                                  <el-option
                                    label="MySQL"
                                    value="MySQL"
                                  ></el-option>
                                  <el-option
                                    label="Oracle"
                                    value="Oracle"
                                  ></el-option>
                                  <el-option
                                    label="DB2"
                                    value="DB2"
                                  ></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item
                                label="数据源名称"
                                prop="sourceName"
                              >
                                <el-input
                                  v-model.trim="DataSource.sourceName"
                                ></el-input>
                              </el-form-item>
                              <el-form-item
                                label="主机ip"
                                prop="mySQLLinkModel.ip"
                              >
                                <el-input
                                  v-model.trim="DataSource.mySQLLinkModel.ip"
                                ></el-input>
                              </el-form-item>
                              <el-form-item
                                label="端口号"
                                prop="mySQLLinkModel.port"
                              >
                                <el-input
                                  v-model.trim="DataSource.mySQLLinkModel.port"
                                ></el-input>
                              </el-form-item>
                              <el-form-item
                                label="数据库名称"
                                prop="mySQLLinkModel.dbName"
                              >
                                <el-input
                                  v-model.trim="
                                    DataSource.mySQLLinkModel.dbName
                                  "
                                ></el-input>
                              </el-form-item>
                              <el-form-item
                                label="用户名"
                                prop="mySQLLinkModel.userName"
                              >
                                <el-input
                                  v-model.trim="
                                    DataSource.mySQLLinkModel.userName
                                  "
                                ></el-input>
                              </el-form-item>
                              <el-form-item
                                label="密码"
                                prop="mySQLLinkModel.password"
                              >
                                <el-input
                                  v-model.trim="
                                    DataSource.mySQLLinkModel.password
                                  "
                                  show-password
                                ></el-input>
                              </el-form-item>
                              <el-form-item v-show="!sourceDisabled">
                                <el-button
                                  type="success"
                                  @click="sourceLinkTest"
                                  >连接测试</el-button
                                >
                                <el-button type="primary" @click="AddSource"
                                  >立即创建</el-button
                                >
                              </el-form-item>
                            </el-form>
                          </el-dialog>
                        </template>

                        <el-radio-group v-model.trim="form.sourceId" class="fl">
                          <el-radio
                            :label="item.sourceId"
                            class="data_source-box select"
                            v-for="item in sourceData"
                            :key="item.sourceId"
                          >
                            {{ item.sourceName }}
                            <el-button
                              type="text"
                              class="fr"
                              @click="getDataSourceInfo(item.sourceId)"
                              >详情</el-button
                            >
                          </el-radio>
                        </el-radio-group>
                      </div>
                      <div class="data_source-list mt10">
                        <h4>请选择一个数据目的地</h4>

                        <!-- 新建数据目的地的模态框 -->
                        <template>
                          <el-button
                            type="text"
                            round
                            class="data_source-box add mr30"
                            @click="newDataDestination"
                            >新建数据目的地</el-button
                          >
                          <el-dialog
                            title="数据目的地信息"
                            :visible.sync="innerVisible"
                            :close-on-click-modal="false"
                            @close="$refs.DataDestination.resetFields()"
                          >
                            <el-form
                              ref="DataDestination"
                              :model="DataDestination"
                              label-width="150px"
                              class="demo-ruleForm"
                              :disabled="destinationDisabled"
                              :rules="DataDestinationRules"
                            >
                              <el-form-item
                                label="数据目的地类型"
                                prop="destinationType"
                              >
                                <el-select
                                  v-model.trim="DataDestination.destinationType"
                                  placeholder="请选择目的地类型"
                                >
                                  <el-option
                                    label="Hive"
                                    value="Hive"
                                  ></el-option>
                                  <el-option
                                    label="Oracle"
                                    value="Oracle"
                                  ></el-option>
                                  <el-option
                                    label="DB2"
                                    value="DB2"
                                  ></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item
                                label="数据源名称"
                                prop="destinationName"
                              >
                                <el-input
                                  v-model.trim="DataDestination.destinationName"
                                ></el-input>
                              </el-form-item>
                              <el-form-item
                                label="主机ip"
                                prop="hiveLinkModel[ip]"
                              >
                                <el-input
                                  v-model.trim="
                                    DataDestination.hiveLinkModel.ip
                                  "
                                ></el-input>
                              </el-form-item>
                              <el-form-item
                                label="端口号"
                                prop="hiveLinkModel.port"
                              >
                                <el-input
                                  v-model.trim="
                                    DataDestination.hiveLinkModel.port
                                  "
                                ></el-input>
                              </el-form-item>
                              <el-form-item
                                label="path路径"
                                prop="hiveLinkModel.path"
                              >
                                <el-input
                                  v-model.trim="
                                    DataDestination.hiveLinkModel.path
                                  "
                                ></el-input>
                              </el-form-item>
                              <el-form-item v-show="!destinationDisabled">
                                <el-button
                                  type="success"
                                  @click="destinationLinkTest"
                                  >连接测试</el-button
                                >
                                <el-button
                                  type="primary"
                                  @click="AddDestination"
                                  >立即创建</el-button
                                >
                              </el-form-item>
                            </el-form>
                          </el-dialog>
                        </template>

                        <!-- <el-button type="text" round class="data_source-box add mr30">新建数据目的地</el-button> -->
                        <el-radio-group
                          v-model.trim="form.destinationId"
                          class="fl"
                        >
                          <el-radio
                            :label="item.destinationId"
                            class="data_source-box select"
                            v-for="item in destinationData"
                            :key="item.destinationId"
                          >
                            {{ item.destinationName }}
                            <el-button
                              type="text"
                              class="fr"
                              @click="
                                getDataDestinationInfo(item.destinationId)
                              "
                              >详情</el-button
                            >
                          </el-radio>
                        </el-radio-group>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <el-button class="add mt20" round @click="addEjob"
                  >下一步</el-button
                >
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Message } from "element-ui";
import Header from "@/views/layout/header.vue";
import Steps from "@/views/home/Steps.vue";
import {
  reqAddSource,
  reqUpdateSource,
  reqDeleteDataSource,
  reqDataSource,
  reqLInkTest,
  reqDataSourceInfo,
  reqAddDestination, //增加目的地
  reqDataDestinationInfo, //信息
  reqDataDestination, // 目的地列表
  reqDisLinkTest,
  reqAddEjob, //新增作业的接口
  reqEjobInfo, //查看作业信息的接口
  reqUpdateEjob // 跟新作业的接口
} from "@/api";

import axios from "axios";
export default {
  name: "addDataSourceStep1",
  data() {
    // 验证ip的正则信息
    var validateIp = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入ip地址"));
      } else {
        let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        if (!reg.test(value)) {
          callback(new Error("请输入正确ip格式"));
        }
        callback();
      }
    };
    return {
      projectId: "", //项目id
      sourceData: [], // 项目下数据源列表
      destinationData: [], // 项目下数据目的地列表
      sourceDisabled: false, // 标识数据源列表是否禁用 disabled
      destinationDisabled: false, //标识目的地源列表是否禁用 disabled
      ejobId: this.$route.query.ejobId, // 通过编辑按钮进来的ejobId
      active: 0, // 步骤条参数
      // 新增作业 整体的信息
      form: {
        projectId: this.$route.query.projectId,
        ejobName: "",
        sourceId: "",
        destinationId: ""
      },
      // 新增数据源 存整体的信息
      DataSource: {
        projectId: this.$route.query.projectId,
        sourceName: "",
        sourceType: "",
        // 存主机ip的信息
        mySQLLinkModel: {
          ip: "",
          port: "",
          dbName: "",
          userName: "",
          password: ""
        }
      },
      DataSourceRules: {
        sourceName: [
          { required: true, message: "请输入数据源名称", trigger: "blur" },
          { min: 3, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
        ],
        "mySQLLinkModel.ip": [
          { required: true, validator: validateIp, trigger: "blur" }
        ],
        "mySQLLinkModel.port": [
          { required: true, message: "请输入端口号", trigger: "blur" }
        ],
        "mySQLLinkModel.dbName": [
          { required: true, message: "请输入数据库名称", trigger: "blur" }
        ],
        "mySQLLinkModel.userName": [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        "mySQLLinkModel.password": [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      },
      // 新增目的地的整体信息
      DataDestination: {
        projectId: this.$route.query.projectId,
        destinationName: "",
        destinationType: "", //Hive
        hiveLinkModel: {
          ip: "", //10.108.10.47
          port: "", //8020
          path: "" ///user/hive/warehouse
        }
      },
      DataDestinationRules: {
        destinationName: [
          { required: true, message: "请输入目的地名称", trigger: "blur" },
          { min: 3, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
        ],
        "hiveLinkModel[ip]": [
          { required: true, validator: validateIp, trigger: "blur" }
        ],
        "hiveLinkModel.port": [
          { required: true, message: "请输入端口号", trigger: "blur" }
        ],
        "hiveLinkModel.path": [
          { required: true, message: "请输入路劲地址", trigger: "blur" }
        ]
      },
      outerVisible: false, //控制新增 数据源的显示
      innerVisible: false //控制新增 目的地的显示
    };
  },
  components: {
    Header,
    Steps
  },
  methods: {
    //点击新增数据源按钮的方法  1. 清除上一次读取的数据  2. 禁用disabled  3.弹出模态框
    newDataSource() {
      this.outerVisible = true;
      this.sourceDisabled = false;
      this.$nextTick(function() {
        this.$refs.DataSource.resetFields();
      });
    },
    // 点击新增 目的地的按钮
    newDataDestination() {
      this.innerVisible = true;
      this.destinationDisabled = false;
      this.$nextTick(function() {
        this.$refs.DataDestination.resetFields();
      });
    },
    // 单纯的链接测试
    sourceLinkTest() {
      this.$refs.DataSource.validate(valid => {
        if (valid) {
          reqLInkTest(this.DataSource).then(res => {
            if (res.repCode == "0000") {
              this.$message({
                message: "数据源测试连接成功",
                type: "success"
              });
            } else {
              this.$message({
                message: "测试连接失败,请检查连接参数",
                type: "error"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    // 新增数据源的接口
    AddSource() {
      this.$refs.DataSource.validate(valid => {
        if (valid) {
          reqLInkTest(this.DataSource)
            .then(res => {
              if (res.repCode == "0000") {
                reqAddSource(this.DataSource).then(result => {
                  if (result.repCode == "0000") {
                    // 新增数据源成功 显示到界面上 吧获取再调用一次
                    this.$message({
                      message: "新增数据源成功",
                      type: "success"
                    });
                    // 新增数据源成功才关闭模态框
                    this.outerVisible = false;
                    this.getDataSource();
                    this.$refs.DataSource.resetFields();
                  } else {
                    this.$message({
                      message: "新增数据源失败,请重试",
                      type: "error"
                    });
                  }
                });
              } else {
                this.$message({
                  message: "测试连接失败,请检查连接参数",
                  type: "error"
                });
              }
            })
            .catch(res => {
              console.log(res, 999);
            });
        } else {
          return false;
        }
      });
    },
    // 获取项目下数据源列表
    getDataSource() {
      let data = {
        projectId: this.projectId
      };
      reqDataSource(data).then(res => {
        if (res.repCode == "0000") {
          this.sourceData = res.repData.dataSourceVOList;
        } else {
          this.$message({
            message: "获取数据失败",
            type: "error"
          });
        }
      });
    },
    // 获取数据源详细信息
    getDataSourceInfo(item) {
      console.log(item);
      // 点击之后请求接口 设置表单的值
      reqDataSourceInfo({ sourceId: item }).then(res => {
        console.log(res, 8880);
        if (res.repCode == "0000") {
          const { sourceName, mySQLLinkModel } = res.repData.dataSourceVO;
          this.DataSource.sourceName = sourceName;
          this.DataSource.mySQLLinkModel = mySQLLinkModel;
        }
      });
      this.outerVisible = true;
      this.sourceDisabled = true;
    },
    // 新增作业或者 跟新作业 的方法
    addEjob() {
      const { form } = this;
      if (!form.ejobName) {
        this.$message({
          message: "请填写任务名称",
          type: "error"
        });
        return;
      }
      if (!form.sourceId) {
        this.$message({
          message: "请选择数据源数据",
          type: "error"
        });
        return;
      }
      if (!form.destinationId) {
        this.$message({
          message: "请选择目的地数据",
          type: "error"
        });
        return;
      }
      if (this.ejobId) {
        // 跟新操作
        // 如果有ejobId 就是编辑操作  点击保存进行跟新数据效果
        const ejobinfo = JSON.parse(localStorage.getItem("ejobInfo") || "{}");
        // 做判断 如果没有存的数据就定向到项目首页
        const {
          ejobId,
          ejobStatus,
          maxReadSpeed,
          maxWriteSpeed,
          isIncrease,
          readFrequency
        } = ejobinfo;
        // 发送 跟新作业的请求
        let data = {
          ejobId: ejobId,
          ejobName: this.form.ejobName,
          sourceId: this.form.sourceId,
          maxReadSpeed: maxReadSpeed,
          destinationId: this.form.destinationId,
          maxWriteSpeed: maxWriteSpeed,
          isIncrease: isIncrease,
          readFrequency: readFrequency,
          ejobStatus: ejobStatus
        };
        // 这里有可能 重新设置了名字  数据源id  目的地id  所以要覆盖之前存在内存中的数据
        // 或者下一步的时候 继续再读一次
        reqUpdateEjob(data).then(res => {
          if (res.repCode == "0000") {
            // 跟新成功跳转下一步
            this.$router.push("/addDataSourceStep2?ejobId=" + ejobId);
          }
        });
      } else {
        // 新增操作
        // 校验有没有填写名称 选择数据源 目的地
        console.log(this.form);
        reqAddEjob(this.form).then(res => {
          console.log(res, 767676);
          if (res.repCode == "0000") {
            //表示新增任务成功
            //将返回的ejobVO 储存下来 共下一个页面
            localStorage.setItem(
              "ejobInfo",
              JSON.stringify(res.repData.ejobVO)
            );
            const ejobId = res.repData.ejobVO.ejobId;
            this.$router.push("/addDataSourceStep2?ejobId=" + ejobId);
          } else {
            this.$message({
              message: "新增作业ejob失败",
              type: "error"
            });
          }
        });
      }
    },

    // --------------数据目的地的方法------------

    // 单纯的连接测试
    destinationLinkTest() {
      this.$refs.DataDestination.validate(valid => {
        if (valid) {
          reqDisLinkTest(this.DataDestination).then(res => {
            if (res.repCode == "0000") {
              this.$message({
                message: "数据目的地测试连接成功",
                type: "success"
              });
            } else {
              this.$message({
                message: "数据目的地测试连接失败,请检查连接参数",
                type: "error"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    // 新增数据目的地
    AddDestination() {
      this.$refs.DataDestination.validate(valid => {
        if (valid) {
          reqDisLinkTest(this.DataDestination).then(res => {
            // console.log(res,"测试数据目的地连接");
            if (res.repCode == "0000") {
              reqAddDestination(this.DataDestination).then(result => {
                console.log(result, 8880);
                if (result.repCode == "0000") {
                  // 新增数据源成功 显示到界面上 吧获取再调用一次
                  // 新增成功才关闭模态框.   失败则提示
                  this.$message({
                    message: "新增数据目的地成功",
                    type: "success"
                  });
                  this.innerVisible = false;
                  this.getDataDestination();
                  this.$refs.DataDestination.resetFields();
                } else {
                  this.$message({
                    message: "新增数据目的地失败,请稍后再试",
                    type: "error"
                  });
                }
              });
            } else {
              this.$message({
                message: "测试连接失败,请检查连接参数",
                type: "error"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    // 获取项目下数据目的地列表
    getDataDestination() {
      reqDataDestination({ projectId: this.projectId }).then(res => {
        console.log(res, "数目目的地列表");
        if (res.repCode == "0000") {
          this.destinationData = res.repData.dataDestinationVOList;
        } else {
          this.$message({
            message: "获取数据失败",
            type: "error"
          });
        }
      });
    },
    // 获取项目下数据目的地的详细信息
    getDataDestinationInfo(item) {
      reqDataDestinationInfo({ destinationId: item }).then(res => {
        console.log(res, 77777);
        if (res.repCode == "0000") {
          const {
            destinationName,
            hiveLinkModel
          } = res.repData.dataDestinationVO;
          this.DataDestination.destinationName = destinationName;
          this.DataDestination.hiveLinkModel = hiveLinkModel;
        }
      });
      this.innerVisible = true;
      this.destinationDisabled = true;
    },

    //更新进来 获取作业信息接口的方法
    getEjobInfo() {
      if (this.ejobId) {
        reqEjobInfo({ ejobId: this.ejobId }).then(res => {
          console.log(res, 6666);
          if (res.repCode == "0000") {
            const ejobInfo = res.repData.ejobVO;
            // 1.第一步 覆盖localStorage 中的数据  后面都要用到
            localStorage.setItem("ejobInfo", JSON.stringify(ejobInfo));
            // 2. 覆盖 页面页面上用到 projectId的地方 的projectId 值
            this.projectId = ejobInfo.projectId;
            this.DataDestination.projectId = ejobInfo.projectId;
            this.DataSource.projectId = ejobInfo.projectId;
            this.form.projectId = ejobInfo.projectId;
            //  设置页面上默认值
            this.form.ejobName = ejobInfo.ejobName;
            this.form.sourceId = ejobInfo.sourceId;
            this.form.destinationId = ejobInfo.destinationId;
          }
        });
      }
    }
  },
  created() {
    // 如果是新增进来就用 路由赋值
    this.projectId = this.$route.query.projectId;
    // 如果是编辑进来 就用 后来的赋值 覆盖之前的路由赋值
    this.getEjobInfo();
    // 获取数据源列表
    this.getDataSource();
    // 获取目的地列表
    this.getDataDestination();
  },
  mounted() {
    // 设置默认值
    this.DataSource.sourceType = "MySQL";
    this.DataDestination.destinationType = "Hive";
  }
};
</script>

<style scoped lang="less">
.lh32 {
  line-height: 40px;
}
.li_card-content {
  padding: 20px;
  .li_card-input {
    h4 {
      text-align: left;
      font-size: 14px;
    }
  }
}
.data_source-list {
  width: 100%;
  padding-bottom: 50px;
  h4 {
    line-height: 40px;
  }
  /deep/.el-dialog {
    width: 40%;
    .el-dialog__body {
      text-align: left;
    }
  }
}
.data_source-box {
  width: 230px;
  float: left;
  text-align: left;
  padding: 0 20px;
  box-sizing: border-box;
  .el-button--text {
    color: #999;
  }
  margin: 10px 15px;
}
.data_source-box.add {
  height: 40px;
  border: 1px solid #5bc0de;
  background: #5bc0de;
  color: #fff;
  text-align: center;
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
</style>
