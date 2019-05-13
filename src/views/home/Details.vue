<template>
  <div class="map">
    <el-container>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <el-row>
            <el-col :span="24">
              <div class="content">
                <!-- 头部行兆 -->
                <div class="header">
                  <div class="header-left">
                    <h3>{{ ejobTotalInfo.ejobName }}</h3>
                    <div class="icon">
                      <i
                        class="el-icon-edit"
                        @click="
                          $router.push(
                            `/addDataSourceStep1?ejobId=${ejobId}&projectId=${projectId}`
                          )
                        "
                        v-if="ejobTotalInfo.ejobStatus == 0"
                      ></i>
                      <i
                        class="el-icon-delete"
                        @click="deleteEjob(ejobId)"
                        v-if="ejobTotalInfo.ejobStatus == 0"
                      ></i>
                    </div>
                  </div>
                  <div class="header-right">
                    <span>单位 :</span>
                    <ul>
                      <li class="active">行</li>
                      <li>MB</li>
                    </ul>
                  </div>
                </div>
                <!-- 中间速度部分 -->
                <div class="detail-card detail-card-add">
                  <div class="detail-item-baseInfo">
                    <div class="root">
                      <div>
                        状态 :
                        <span class="state">{{
                          status[ejobTotalInfo.ejobStatus]
                        }}</span>
                      </div>
                      <a href="javascript:;">
                        <button
                          type="button"
                          class="style_button"
                          @click.stop="handleStatus(ejobTotalInfo.ejobStatus)"
                        >
                          {{ status[ejobTotalInfo.ejobStatus + 4] }}
                        </button>
                      </a>
                    </div>
                    <div class="sourceDestinationInfo">
                      <span class="lineArrow"></span>
                      <div class="wrapper-1">
                        <svg
                          class="dataIcon"
                          focusable="false"
                          fill="#999"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <g fill-rule="evenodd">
                            <path
                              d="M18.202 15.238l-5.484 2.904c-.4.213-1.052.213-1.454 0l-5.497-2.913a.621.621 0 0 1-.26-.229H3c.051.149.182.291.392.407l7.59 4.162c.555.305 1.454.305 2.008.002l7.57-4.153c.216-.118.347-.265.394-.418h-2.49a.605.605 0 0 1-.262.238z"
                            ></path>
                            <path
                              d="M18.202 12.238l-5.484 2.904c-.4.213-1.052.213-1.454 0l-5.497-2.913a.621.621 0 0 1-.26-.229H3c.051.149.182.291.392.407l7.59 4.162c.555.305 1.454.305 2.008.002l7.57-4.153c.216-.118.347-.265.394-.418h-2.49a.605.605 0 0 1-.262.238z"
                            ></path>
                            <path
                              d="M3.417 9.481l7.59 4.163c.555.304 1.454.305 2.008.001l7.57-4.152c.554-.304.553-.797-.002-1.101l-7.59-4.163c-.555-.305-1.454-.305-2.008-.002L3.415 8.38c-.554.304-.553.797.002 1.101z"
                            ></path>
                          </g>
                        </svg>
                        <div class="dataEntry">
                          <i class="el-icon-info"></i>
                          <span>{{ ejobTotalInfo.sourceName }}</span>
                          <!-- <button type="button" class="fr">详情</button> -->
                        </div>
                      </div>
                      <div class="wrapper-1" style="margin-bottom:0px">
                        <svg
                          class="dataIcon"
                          focusable="false"
                          fill="#999"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <g fill-rule="evenodd">
                            <path
                              d="M11.816 4c2.663 0 4.793 2.107 4.817 4.7 0 3.404-4.572 7.31-4.827 7.31C11.551 16.01 7 12.104 7 8.7 7 6.107 9.153 4 11.816 4zm1.647 4.304c0-.957-.774-1.73-1.73-1.73-.957 0-1.73.773-1.73 1.73 0 .956.773 1.73 1.73 1.73.956 0 1.73-.753 1.73-1.73zM5 18v2h14v-2z"
                            ></path>
                          </g>
                        </svg>
                        <div class="dataEntry">
                          <i class="el-icon-success"></i>
                          <span>{{ ejobTotalInfo.destinationName }}</span>
                          <!-- <button type="button" class="fr">详情</button> -->
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="detail-item-progress">
                    <div class="progress-hd">
                      {{
                        ejobTotalInfo.isIncrease == 0 ? "全量数据" : "增量数据"
                      }}
                      <span class="icon iconfont icon-bianji"></span>
                    </div>
                    <div class="progress-bd">
                      {{
                        ejobTotalInfo.ejobStatus == 0
                          ? "任务尚未激活"
                          : `已同步${ejobTotalInfo.readRowCount}条`
                      }}
                    </div>
                  </div>
                  <div class="detail-card-sourceRate">
                    读取速率
                    <div class="rate-content">
                      <div>
                        <span>{{ ejobTotalInfo.maxReadSpeed || 0 }}</span>
                        <span>行/秒</span>
                      </div>
                    </div>
                  </div>
                  <div class="detail-card-sourceRate">
                    处理速率
                    <div class="rate-content">
                      <div>
                        <span>{{ ejobTotalInfo.maxWriteSpeed || 0 }}</span>
                        <span>行/秒</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- tab菜单部分 -->
                <!-- <div class="dataTab">
                    <ul>
                      <li>概览</li>
                      <li>错误明细</li>
                    </ul>
                    <div class="data-creat">
                       创建人<span> admin </span>
                       <span> | </span>
                      创建时间<span>2019-04-04 09:09:05</span>
                    </div>
                </div>-->

                <!-- tab菜单下的具体任务 -->
                <div
                  class="data-Tabcontent"
                  v-if="
                    ejobTotalInfo.ejobStatus == 1 ||
                      ejobTotalInfo.ejobStatus == 2 ||
                      ejobTotalInfo.ejobStatus == 3
                  "
                >
                  <el-row :gutter="20">
                    <el-col :span="18" class="data-left">
                      <!-- 具体的表任务 -->
                      <div class="data-form">
                        <el-table
                          ref="multipleTable"
                          :data="
                            etaskBoards.length > 0
                              ? etaskBoards
                              : [{ tableName: '暂无任务列表数据' }]
                          "
                          tooltip-effect="dark"
                          style="width: 100%"
                        >
                          <el-table-column
                            label="表名称"
                            prop="tableName"
                            align="center"
                          ></el-table-column>
                          <el-table-column
                            prop="readRowCount"
                            sortable
                            label="已读取数据"
                            align="center"
                          >
                            <template slot-scope="scope">
                              {{ scope.row.readRowCount }}
                              <span v-if="scope.row.readRowCount">行</span>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="writeRowCount"
                            sortable
                            label="已处理数据"
                            align="center"
                          >
                            <template slot-scope="scope">
                              {{ scope.row.writeRowCount }}
                              <span v-if="scope.row.writeRowCount">行</span>
                            </template>
                          </el-table-column>
                          <el-table-column
                            prop="errorRowCount"
                            label="错误数据"
                            sortable
                            align="center"
                          >
                            <template slot-scope="scope">
                              {{ scope.row.errorRowCount }}
                              <span v-if="scope.row.errorRowCount != undefined"
                                >行</span
                              >
                              <el-button
                                type="text"
                                style="margin-left:20px"
                                v-if="scope.row.errorRowCount"
                                @click="showError(scope.$index, scope.row)"
                                >详情</el-button
                              >
                            </template>
                          </el-table-column>
                          <el-table-column
                            label="完成进度"
                            sortable
                            width="200"
                            align="center"
                          >
                            <el-progress
                              :percentage="100"
                              v-if="etaskBoards.length > 0"
                            ></el-progress>
                          </el-table-column>
                          <el-table-column
                            label="同步状态"
                            v-if="etaskBoards.length > 0"
                            align="center"
                            >完成</el-table-column
                          >
                        </el-table>
                      </div>
                    </el-col>
                    <el-col :span="6" class="data-steps">
                      <div class="step-title">任务运行日志</div>
                      <el-row class="step-content" style=";">
                        <el-button type="info" round plain mb20 size="small">{{
                          new Date() | yearTime
                        }}</el-button>
                        <div class="step-info">
                          <ul>
                            <li v-for="(item, index) in ejobLogs" :key="index">
                              <i class="el-icon-edit"></i>
                              {{ item.operateInfo }}
                              <span>{{ item.createdTime | timeFormat }}</span>
                            </li>
                          </ul>
                        </div>
                      </el-row>
                    </el-col>
                  </el-row>
                </div>
                <div
                  class="datalineStepIndicator"
                  v-if="ejobTotalInfo.ejobStatus == 0"
                >
                  <div class="top">
                    <el-button
                      type="primary"
                      round
                      @click.stop="handleStatus(ejobTotalInfo.ejobStatus)"
                      >{{ status[ejobTotalInfo.ejobStatus + 4] }}</el-button
                    >
                    <div>
                      配置规则完成后才能激活任务，请点击「{{
                        status[ejobTotalInfo.ejobStatus + 4]
                      }}」进行设置
                    </div>
                  </div>
                  <div class="bottom">
                    <el-steps finish-status="success">
                      <el-step title="1.连接数据源和目的地"></el-step>
                      <el-step title="2.任务设置"></el-step>
                      <el-step title="3.配置规则"></el-step>
                      <el-step title="4.激活 - 完成"></el-step>
                    </el-steps>
                  </div>
                </div>
              </div>

              <!-- 后端返回的时实日志 -->
              <el-row v-if="ejobTotalInfo.ejobStatus == 2">
                <el-col :span="22" :offset="1">
                  <el-collapse>
                    <el-collapse-item title="点击查看---任务执行日志详情">
                      <div v-if="logInfo.length > 0">
                        <div v-for="(log, index) in logInfo" :key="index">
                          {{ log.msg }}
                        </div>
                      </div>
                      <div v-else>暂无日志数据,稍等片刻</div>
                    </el-collapse-item>
                  </el-collapse>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>

    <!-- // 错误信息的弹出框 -->
    <el-dialog title="错误信息详情" :visible.sync="dialogVisible" width="40%">
      <span>这是一段信息</span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Header from "@/views/layout/header.vue";
import leftBar from "@/views/layout/leftBar.vue";
import { formatTime, formatNumber } from "@/utils/utils";
import {
  reqEtaskBoard,
  reqTotalRunInfo,
  reqDeleteEjob,
  reqActivateEjob,
  reqSuspendEjob,
  reqRunEjob,
  reqEjobOperateLog,
  reqInsertEjobOperateLog
} from "@/api";

export default {
  name: "Details",
  data() {
    return {
      etaskBoards: [], //作业下的任务列表
      status: [
        "待激活",
        "已激活",
        "运行中",
        "暂停中",
        "激活",
        "运行",
        "暂停",
        "开始"
      ],
      ejobId: this.$route.query.ejobId,
      projectId: this.$route.query.projectId,
      ejobTotalInfo: {}, // 作业的详细信息
      ejobLogs: [], // 作业的操作记录
      dialogVisible: false, //  错误信息的弹出框 flag
      logInfo: [], //后端返回的日志信息数据
      stompClient: "",
      timer: "" //webSocket定时器
    };
  },
  components: {
    Header
  },
  computed: {},
  methods: {
    // 获取作业运行状态
    getTotalRunInfo() {
      reqTotalRunInfo({ ejobId: this.ejobId }).then(res => {
        console.log(res, "详情页总信息");
        if (res.repCode == "0000") {
          this.ejobTotalInfo = res.repData.ejobVO;
          // 如果进来是运行中的状态 重新建立websocket连接
          if (this.ejobTotalInfo.ejobStatus == 2) {
            this.initWebSocket();
          }
        }
      });
    },
    // 获取作业详情页列表
    getEtaskBoard() {
      reqEtaskBoard({ ejobId: this.ejobId }).then(res => {
        console.log(res, "详情页任务列表");
        if (res.repCode == "0000") {
          // 获取到的结果赋值给列表
          this.etaskBoards = res.repData;
          console.log(this.etaskBoards);
        }
      });
    },
    // 获取作业操作记录列表
    getEjobOperateLog() {
      reqEjobOperateLog({ ejobId: this.ejobId }).then(res => {
        console.log(res, "作业操作记录列表");
        if (res.repCode == "0000") {
          this.ejobLogs = res.repData.ejobOperateLogVOList;
        }
      });
    },
    //  删除任务的方法
    deleteEjob(ejobId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 删除成功的操作
          reqDeleteEjob({ ejobId: ejobId }).then(res => {
            console.log(res, "删除成功");
            if (res.repCode == "0000") {
              // 跳转到项目下作业列表
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.$router.push("/index?projectId=" + this.projectId);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 处理不同状态下 不同的触发事件
    async handleStatus(status) {
      if (status == 0) {
        // 立即激活
        let data = {
          ejobId: this.ejobId,
          ejobStatus: status
        };
        const res = await reqActivateEjob(data);
        if (res.repCode == "0000") {
          // 说明激活成功  跳转到项目下作业列表
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          setTimeout(() => {
            loading.close();
            // this.$router.push(`/index?projectId=${this.projectId}`); 不跳转
            this.ejobTotalInfo.ejobStatus = 1;
          }, 1000);
        } else {
          // 弹出提示 去完善
          this.$confirm(res.repMsg, {
            confirmButtonText: "去完善",
            cancelButtonText: "取消",
            type: "warning",
            closeOnClickModal: false
          })
            .then(() => {
              this.$router.push(
                `/addDataSourceStep1?ejobId=${this.ejobId}&projectId=${
                  this.projectId
                }`
              );
            })
            .catch(() => {});
        }
      } else if (status == 2) {
        //暂停任务
        const res = await reqSuspendEjob({ ejobId: this.ejobId });
        if (res.repCode == "0000") {
          // 说明暂停成功
          // this.$router.push(`/index?projectId=${this.projectId}`);
          this.ejobTotalInfo.ejobStatus = 3;
          //  暂停了任务就停止websocket
          this.disconnect();
          clearInterval(this.timer);
        }
      } else {
        // 开始任务
        const res = await reqRunEjob({ ejobId: this.ejobId });
        console.log("调用开始成功");
        if (res.repCode == "0000") {
          //  说明开始成功
          // this.$router.push(`/index?projectId=${this.projectId}`);
          this.ejobTotalInfo.ejobStatus = 2;
          this.initWebSocket(); // 调用websocket
        }
      }
      // 只要点击了 无论什么操作 都重新调用一遍 获取操作记录表
      this.getEjobOperateLog();
    },

    // 展示任务错误信息的弹框
    showError(index, row) {
      console.log(index);
      console.log(row);
      this.dialogVisible = true;
    },
    //---------------webSoket连接-------------
    initWebSocket() {
      this.connection();
      // let that = this;
      // 断开重连机制,尝试发送消息,捕获异常发生时重连
      // this.timer = setInterval(() => {
      //   try {
      //     that.stompClient.send("test");
      //   } catch (err) {
      //     console.log("断线了: " + err);
      //     that.connection();
      //   }
      // }, 5000);
    },
    connection() {
      // 建立连接对象
      // let socket = new SockJS("http://10.108.12.12:8082/websocket"); //本地
      let socket = new SockJS("http://10.108.11.45:8082/websocket"); //线上
      // 获取STOMP子协议的客户端对象
      this.stompClient = Stomp.over(socket);
      // 定义客户端的认证信息,按需求配置
      let headers = {
        // Authorization:''
      };
      // 向服务器发起websocket连接
      this.stompClient.connect(
        headers,
        () => {
          this.stompClient.subscribe(`/user/ejob_${this.ejobId}/result`, msg => {
            // 订阅服务端提供的某个topic
            console.log("广播成功");
            console.log(msg); // msg.body存放的是服务端发送给我们的信息
            this.logInfo.push(JSON.parse(msg.body));
          });
          // this.stompClient.send(
          //   `http://10.108.12.12:8080/data/data/getLogs/${this.ejobId}`,
          //   headers,
          //   JSON.stringify({ sender: "哈哈哈哈", chatType: "JOIN" })
          // );
          axios
            .get(`http://10.108.11.45:8080/data/data/getLogs/ejob_${this.ejobId}`)
            // .get(`http://10.108.12.12:8080/data/data/getLogs/${this.ejobId}`)
            .then(res => {
              console.log(res, 99999);
            })
            .catch(() => {});
        },
        err => {
          // 连接发生错误时的处理函数
          console.log("失败");
          console.log("断线了: " + err);
          this.connection();
        }
      );
    }, //连接 后台
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
    } // 断开连接
  },
  created() {
    this.getEtaskBoard();
    this.getTotalRunInfo();
    this.getEjobOperateLog();
  },
  filters: {
    // yy-mm-dd hh:mm:ss
    timeFormat(val) {
      return formatTime(val);
    },
    // yy-mm-dd
    yearTime(val) {
      var date = new Date(val);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      return [year, month, day].map(formatNumber).join("-");
    }
  },
  watch: {
    etaskBoards: {
      handler(newVal, oldVal) {
        console.log(oldVal);
      },
      deep: true
    }
  },
  beforeDestroy: function() {
    // 页面离开时断开连接,清除定时器
    this.disconnect();
    clearInterval(this.timer);
  }
};
</script>

<style scoped lang="less">
.map {
  .el-main {
    padding: 10px 0;
  }
}
.content {
  .header,
  .header-left,
  .header-right {
    display: flex;
    align-items: center;
  }
  .header {
    height: 60px;
    padding: 0 24px;
    background: #fff;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-shadow: 0 10px 30px rgba(24, 28, 33, 0.04);
    box-shadow: 0 10px 30px rgba(24, 28, 33, 0.04);
  }
  .header-left {
    h3 {
      font-weight: 400;
      margin-right: 16px;
      font-size: 18px;
    }
    .icon {
      i {
        margin-right: 10px;
        font-size: 18px;
        color: #6b83c3;
        cursor: pointer;
      }
    }
  }
  .header-right {
    ul {
      margin-left: 15px;
      li.active {
        color: #4664b4;
        background: rgba(70, 100, 180, 0.05);
        border-color: rgba(70, 100, 180, 0.2);
        border-right-width: 1px;
      }
      li {
        float: left;
        padding: 0 24px;
        height: 36px;
        line-height: 36px;
        border: 1px solid hsla(0, 0%, 90%, 0.7);
        border-right-width: 0;
        color: #999;
        cursor: pointer;
      }
    }
  }

  .detail-card {
    position: relative;
    margin: 0 24px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: stretch;
    align-items: stretch;
    margin-bottom: 20px;
    .detail-item-baseInfo {
      flex: 1 1;
      border-right: 1px solid hsla(0, 0%, 90%, 0.7);
      padding: 24px;
      .root {
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: justify;
        justify-content: space-between;
        color: #666;
        font-size: 14px;
        height: 32px;
        .state {
          font-weight: 500;
          color: #666;
        }
        a {
          color: #4664b4;
          .style_button {
            height: 32px;
            line-height: 32px;
            padding: 0 10px;
            font-size: 12px;
            min-width: 72px;
            color: rgba(70, 100, 180, 0.8);
            border: 1px solid rgba(70, 100, 180, 0.8);
            border-radius: 23px;
            background: #fff;
            opacity: 0.8;
            cursor: pointer;
            &:hover {
              color: #fff;
              background-color: #38508f;
            }
          }
        }
      }
      .sourceDestinationInfo {
        position: relative;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        -ms-flex-pack: justify;
        justify-content: space-between;
        margin-top: 16px;
        .lineArrow {
          position: absolute;
          top: 33px;
          bottom: 35.5px;
          left: 11.5px;
          width: 0;
          border-left: 1px dashed #4664b4;
          &:after {
            content: "";
            position: absolute;
            bottom: -2.5px;
            left: -3px;
            width: 0;
            height: 0;
            border-top: 2.5px solid #4664b4;
            border-right: 2.5px solid transparent;
            border-bottom: 0;
            border-left: 2.5px solid transparent;
            overflow: hidden;
            box-sizing: border-box;
            padding: 0;
            margin: 0;
          }
        }
        .wrapper-1 {
          position: relative;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-align: center;
          align-items: center;
          margin-bottom: 16px;
          .dataIcon {
            flex-shrink: 0;
            width: 24px;
            height: 24px;
            padding: 2px;
            border: 2px solid #fff;
            border-radius: 50%;
            fill: #4664b4;
            background-color: #eceff7;
            z-index: 1;
            margin-right: -12px;
          }
        }
        .dataEntry {
          flex: 1 1;
          padding: 0 24px;
          height: 42px;
          line-height: 42px;
          border-radius: 21px;
          border: 1px solid hsla(0, 0%, 90%, 0.7);
          -webkit-box-shadow: none;
          box-shadow: none;
          max-width: none;
          display: flex;
          align-items: center;
          span {
            margin: 0 20px;
          }
          button {
            background-color: transparent;
            position: relative;
            display: inline-block;
            text-align: center;
            text-decoration: none;
            white-space: nowrap;
            cursor: pointer;
            border: 0;
            outline: none;
            color: rgba(70, 100, 180, 0.8);
            left: 150px;
          }
        }
      }
    }
  }
  .detail-item-progress {
    padding: 24px 0;
    -ms-flex: 1 1;
    flex: 1 1;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    .progress-hd {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .progress-bd {
      width: 100%;
      height: 86px;
      margin-top: 10px;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-direction: column;
      flex-direction: column;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-pack: center;
      justify-content: center;
      border-right: 1px solid hsla(0, 0%, 90%, 0.7);
    }
  }
  .detail-card-sourceRate {
    padding: 24px 0;
    -ms-flex: 1 1;
    flex: 1 1;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-align: center;
    align-items: center;
    .rate-content {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 86px;
      margin-top: 10px;
      border-right: 1px solid hsla(0, 0%, 90%, 0.7);
    }
  }
  .detail-card-rateContent {
    padding: 24px 0;
    -ms-flex: 1 1;
    flex: 1 1;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-align: center;
    align-items: center;
  }
}
.detail-card-add {
  border-radius: 2px;
  background: #fff;
  -webkit-box-shadow: 0 10px 30px rgba(24, 28, 33, 0.04);
  box-shadow: 0 10px 30px rgba(24, 28, 33, 0.04);
  margin-bottom: 20px;
}

/deep/.el-collapse {
  margin-bottom: 30px;
  .el-collapse-item__header {
    height: 35px;
    margin-top: 15px;
    background-color: #eee;
    color: #000;
    font-weight: 700;
    font-size: 14px;
    padding-left: 15px;
  }
  .el-collapse-item__wrap {
    max-height: 500px;
    overflow: auto;
    .el-collapse-item__content {
      background-color: #000;
      text-align: left;
      color: greenyellow;
      font-size: 12px;
      line-height: 20px;
    }
  }
}

.data-Tabcontent {
  margin: 0 25px;
  // background-color: #fff;
  text-align: left;

  .title-hd {
    height: 42px;
    line-height: 42px;
    background: #fff;
    border-bottom: 1px solid hsla(0, 0%, 90%, 0.7);
    font-size: 16px;
    color: #333;
    padding: 0 24px;
  }
  /deep/.data-left {
    display: flex;
    flex-direction: column;
    .data-form {
      background-color: #fff;
      .el-table__body-wrapper {
        max-height: 480px;
        overflow-y: auto;
      }
    }
    .data-title {
      height: 114px;
      border-radius: 2px;
      background-color: #fff;
      -webkit-box-shadow: 0 10px 30px rgba(24, 28, 33, 0.04);
      box-shadow: 0 10px 30px rgba(24, 28, 33, 0.04);
      .title-bd {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title-bd-item {
          padding: 24px;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          color: #333;
          div {
            margin-right: 20px;
          }
          > span:nth-of-type(1) {
            font-size: 20px;
            margin-right: 6px;
          }
        }
      }
    }

    .data-content {
      background-color: #fff;
      flex: 1;
      ul {
        overflow: hidden;
        padding: 20px;
        li {
          line-height: 25px;
        }
      }
    }
  }
  .data-steps {
    background-color: #fff;
    padding: 0;
    max-height: 530px;
    .step-title {
      height: 42px;
      line-height: 42px;
      // background: #fff;
      border-bottom: 1px solid hsla(0, 0%, 90%, 0.7);
      font-size: 16px;
      color: #333;
      padding: 0 24px;
    }
    .step-content {
      padding: 20px;
      max-height: 485px;
      overflow-y: auto;
      .step-info {
        ul {
          li {
            line-height: 35px;
            font-size: 14px;
            border-bottom: 1px solid #ccc;
            i {
              margin-right: 20px;
              color: greenyellow;
              font-size: 18px;
            }
            span {
              float: right;
              margin-left: 10px;
              color: #999;
            }
          }
        }
      }
    }
  }
}
.datalineStepIndicator {
  padding: 20px 40px;
  .top {
    > div {
      margin-top: 24px;
      font-size: 14px;
    }
  }
  .bottom {
    margin: 80px auto;
    width: 760px;
  }
}
</style>

