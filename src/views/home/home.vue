<template>
  <div class="map">
    <el-container>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main class="mt20">
          <el-row>
            <el-col
              :span="22"
              :offset="1"
              :xs="22"
              :sm="22"
              :md="22"
              :lg="22"
              :xl="22"
            >
              <div class="content">
                <div class="breadcrumb">
                  <h4 class="fl">数据任务</h4>
                  <div class="fr">
                    <el-input
                      placeholder="请输入内容"
                      v-model="inputSearch"
                      class="input-with-select"
                    >
                      <el-button
                        slot="append"
                        icon="el-icon-search"
                      ></el-button>
                    </el-input>
                  </div>
                  <div class="fr">
                    <el-button
                      round
                      class="add mr10"
                      size="small"
                      @click="goAddDataSource"
                      >添加</el-button
                    >
                  </div>
                </div>
              </div>
            </el-col>
            <el-col
              :span="22"
              :offset="1"
              :xs="22"
              :sm="22"
              :md="22"
              :lg="22"
              :xl="22"
            >
              <div class="content mt10">
                <!--顺序 : 进行中->已激活->待激活->暂停中--->
                <div
                  class="li_card-box mt10"
                  v-for="singStatu in statusBox"
                  :key="singStatu.statuId"
                >
                  <div class="li_card-box_lid">
                    {{ singStatu.name }}&nbsp;&nbsp; 共{{
                      ejobsObj["ejobStatus" + singStatu.statuId]
                        ? ejobsObj["ejobStatus" + singStatu.statuId].length
                        : 0
                    }}条
                  </div>
                  <div class="li_card-content">
                    <el-carousel
                      :autoplay="false"
                      arrow="hover"
                      indicator-position="none"
                      v-if="
                        doubleDimensionalArr(
                          ejobsObj['ejobStatus' + singStatu.statuId]
                        ).length > 0
                      "
                    >
                      <el-carousel-item
                        v-for="(items, index) in doubleDimensionalArr(
                          ejobsObj['ejobStatus' + singStatu.statuId]
                        )"
                        :key="index"
                      >
                        <el-row :gutter="20" class="mg0">
                          <el-col
                            :span="4"
                            v-for="(item, index) in items"
                            :key="index"
                          >
                            <div
                              class="data_card"
                              @click="goDetails(item.ejobId)"
                            >
                              <div>
                                <h4>{{ item.ejobName }}</h4>
                                <ul class="source">
                                  <li class="mt20">
                                    <span class="data_head green">
                                      <i
                                        class="icon iconfont icon-gonggaoliebiao-"
                                      ></i>
                                    </span>
                                    {{ item.sourceName }}
                                  </li>
                                  <li>
                                    <span class="data_head red">
                                      <i
                                        class="el-icon-location-outline icon-tuisongpeizhi-"
                                        style="font-size:16px"
                                      ></i>
                                    </span>
                                    {{ item.destinationName }}
                                  </li>
                                </ul>
                              </div>
                              <div class="status">
                                <el-col :span="24">
                                  <span>{{
                                    item.isIncrease == 0
                                      ? "全量数据"
                                      : "增量数据"
                                  }}</span>
                                </el-col>
                                <el-button
                                  type="primary"
                                  round
                                  plain
                                  size="mini"
                                  class="mt10"
                                  :class="'button' + singStatu.statuId"
                                  v-if="singStatu.statuId != 2"
                                  >{{ singStatu.text }}</el-button
                                >
                              </div>
                            </div>
                          </el-col>
                        </el-row>
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { reqEjobs } from "@/api";
import Header from "@/views/layout/header.vue";
import leftBar from "@/views/layout/leftBar.vue";
export default {
  name: "index",
  data() {
    return {
      projectId: "",
      ejobsObj: {}, // 项目下所有任务的列表的对象
      inputSearch: "", //搜索
      tabPosition: "1", //tabs,
      // 循环四种状态的数组
      statusBox: [
        { name: "运行中", statuId: 2, text: "暂停" },
        { name: "已激活", statuId: 1, text: "去运行" },
        { name: "待激活", statuId: 0, text: "去激活" },
        { name: "暂停中", statuId: 3, text: "去重启" }
      ]
    };
  },
  components: {
    Header,
    leftBar
  },
  computed: {},
  methods: {
    goAddDataSource() {
      this.$router.push(`/addDataSourceStep1?projectId=${this.projectId}`);
    },
    goDetails(ejobId) {
      this.$router.push({
        name: "Details",
        query: {
          ejobId: ejobId,
          projectId: this.projectId
        }
      });
    },
    // 获取所有项目下作业
    async getEjobs() {
      const res = await reqEjobs({ projectId: this.projectId });
      console.log(res);
      if (res.repCode == "0000") {
        //成功之后的信息 赋值
        this.ejobsObj = res.repData.ejobMap;
        // 遍历得到各自状态的 数组
      }
    }
    // 将所有的状态 一维数组 变为 二维数组的方法
  },
  created() {
    this.projectId = this.$route.query.projectId;
    localStorage.setItem("projectId", this.projectId);
    this.getEjobs();
  },
  computed: {
    doubleDimensionalArr() {
      return function(SourceArr = []) {
        const arr = [];
        // .准备一个小数组-(最大长度为6)
        let minArr = [];
        // .遍历传入的数组 得到处理后的二维数组
        SourceArr.forEach(data => {
          // 如果当前小数组(pages)已经满了, 创建一个新的
          if (minArr.length === 6) {
            minArr = [];
          }
          // 如果minArr是空的, 将小数组保存到大数组中
          if (minArr.length === 0) {
            arr.push(minArr);
          }
          // 将当前分类信息保存到小数组中
          minArr.push(data);
        });
        return arr;
      };
    }
  }
};
</script>

<style scoped lang="less">
.lh32 {
  line-height: 40px;
}
.add {
  background: #dd4a68;
  // padding: 5px 20px;
  color: #fff;
  // line-height: 20px;
}

/deep/.li_card-content {
  padding: 10px;
  .el-carousel__container {
    height: 245px;
    .el-col-4 {
      // width: 15.66667%;
    }
  }
  .data_card {
    border: 1px solid #eee;
    min-height: 220px;
    h4 {
      font-size: 14px;
      border-bottom: 1px solid #eee;
      line-height: 40px;
      text-align: left;
      padding: 0 20px;
    }
    &:hover {
      -webkit-transition-duration: 0.55s;
      -o-transition-duration: 0.55s;
      transition-duration: 0.55s;
      border: 1px solid #5bc0de;
      box-shadow: 0 0 6px #5bc0de;
    }
    .source {
      li {
        line-height: 45px;
        padding: 0 20px;
        text-align: left;
        color: #262626;
        font-size: 13px;
        .data_head {
          width: 30px;
          height: 30px;
          display: block;
          margin-right: 10px;
          border-radius: 50%;
          line-height: 30px;
          text-align: center;
          margin-top: 10px;
          font-size: 12px;
          color: #262626;
          float: left;
          i.iconfont {
            font-size: 22px;
          }
        }
        .green {
          background: #5bc0de;
        }
        .red {
          background: #b3d4fc;
        }
      }
    }
    .status {
      margin-top: 20px;
      border-top: 1px solid #eee;
      padding: 10px 0;
      font-size: 12px;
      strong {
        font-weight: 700;
        font-size: 16px;
      }
      .button0 {
        background: #5bc0de;
        color: #fff;
        border: 1px solid #5bc0de;
        font-size: 12px;
        &:hover {
          background: #b3d4fc;
          color: #fff;
          border: 1px solid #b3d4fc;
        }
      }
      .button1 {
        background: #f7b000;
        color: #fff;
        border: 1px solid #f7b000;
        font-size: 12px;
        border-radius: 50px;
        &:hover {
          background: #ffc845;
          color: #fff;
          border: 1px solid #ffc845;
        }
      }
      .button3 {
        background: #dd4a68;
        color: #fff;
        border: 1px solid #dd4a68;
        font-size: 12px;
        border-radius: 50px;
        &:hover {
          background: rgb(233, 111, 136);
          color: #fff;
          border: 1px solid rgb(233, 111, 136);
        }
      }
    }
  }
}
</style>
