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
                  <div class="li_card-box_lid">任务设置</div>
                  <div class="li_card-content">
                    <el-radio-group v-model="form.isIncrease" class="fl">
                      <el-radio :label="0">全量数据</el-radio>
                      <el-radio :label="1">增量数据</el-radio>
                    </el-radio-group>
                    <div class="li_card-input mt30">
                      <div class="data_source-list fl li_input">
                        <el-form
                          ref="form"
                          :model="form"
                          label-width="180"
                          :inline="true"
                          class="fl"
                        >
                          <el-row>
                            <el-col :span="24" v-show="form.isIncrease">
                              <el-form-item label="读取频率" class="fl">
                                <el-input
                                  v-model="form.readFrequency"
                                  placeholder="请输入内容"
                                ></el-input>
                              </el-form-item>

                              <span class="unit">秒</span>
                              <!-- <el-select class="fl" v-model="timeValue" placeholder="请选择">
                                <el-option v-for="item in dataTime" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                              </el-select>-->
                            </el-col>
                            <el-col :span="24">
                              <el-form-item label="读取速率限制" class="fl">
                                <!-- <el-checkbox-group v-model="form.maxReadSpeed" class="fl">
                                  <el-checkbox :true-label="temp2">不高于</el-checkbox>
                                </el-checkbox-group>-->
                                <el-input
                                  v-model="form.maxReadSpeed"
                                  class="width200 fl"
                                  placeholder="请输入内容"
                                ></el-input>
                              </el-form-item>
                              <!-- <el-select class="fl"
                                v-model="timeValue2" placeholder="KB/秒">
                                <el-option
                                  v-for="item in dataTime2"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>-->
                              <span class="unit">KB/秒(0表示不限制哦)</span>
                            </el-col>
                            <el-col :span="24">
                              <el-form-item label="处理速率限制" class="fl">
                                <!-- <el-checkbox-group v-model="form.maxWriteSpeed" class="fl">
                                   <el-checkbox  :true-label="temp1" :value="temp1">不高于</el-checkbox>
                                </el-checkbox-group>-->
                                <el-input
                                  v-model="form.maxWriteSpeed"
                                  placeholder="请输入内容"
                                  class="width200 fl"
                                ></el-input>
                              </el-form-item>
                              <!-- <el-select
                                v-model="timeValue3" placeholder="KB/秒" class="fl">
                                <el-option
                                  v-for="item in dataTime3"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>-->
                              <span class="unit">KB/秒(0表示不限制哦)</span>
                            </el-col>
                          </el-row>
                        </el-form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <el-button
                  class="add mt20"
                  round
                  @click="
                    $router.push(
                      `/addDataSourceStep1?ejobId=${ejobId}&projectId=${projectId}`
                    )
                  "
                  >上一步</el-button
                >
                <el-button class="add mt20" round @click="updateEjob"
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
import { reqUpdateEjob, reqEjobInfo } from "@/api";
import Header from "@/views/layout/header.vue";
import leftBar from "@/views/layout/leftBar.vue";
import Steps from "@/views/home/Steps.vue";
export default {
  name: "addDataSourceStep2",
  data() {
    return {
      active: 1,
      // temp1:'100',  // 不高于 读取速率限制 与 输入框之间的临时变量
      // temp2:"100",
      ejobId: this.$route.query.ejobId,
      projectId: "",
      // 存储所有 数据信息的对象
      form: {
        maxReadSpeed: 0, //最大的读取速度
        maxWriteSpeed: 0, // 最大的写入数据
        isIncrease: "",
        readFrequency: ""
      }
    };
  },
  components: {
    Header,
    leftBar,
    Steps
  },
  computed: {},
  methods: {
    updateEjob() {
      // this.form.maxReadSpeed =  this.form.maxReadSpeed  ? this.temp1 : "0";
      // this.form.maxWriteSpeed = this.form.maxWriteSpeed ? this.temp2 : "0";
      const ejobInfo = JSON.parse(localStorage.getItem("ejobInfo") || "{}");
      // 做判断 如果没有存的数据就定向到项目首页
      if (!ejobInfo.ejobId) {
        //说明本地存储中没有存新增返回的数据 要返回第一步
        this.$router.push("/projectList");
      }
      const {
        ejobId,
        ejobName,
        sourceId,
        destinationId,
        ejobStatus
      } = ejobInfo;
      // 发送 跟新作业的请求
      let data = {
        ejobId: ejobId,
        ejobName: ejobName,
        sourceId: sourceId,
        maxReadSpeed: this.form.maxReadSpeed,
        destinationId: destinationId,
        maxWriteSpeed: this.form.maxWriteSpeed,
        isIncrease: this.form.isIncrease,
        readFrequency: this.form.readFrequency,
        ejobStatus: ejobStatus || 0
      };
      console.log(data);
      reqUpdateEjob(data).then(res => {
        console.log(res, 1000000);
        if (res.repCode == "0000") {
          //这个位置修改之后 可以把locolstorage中的数据清理掉
          // 成功之后设置一下本地内存中的isIncrease值
          ejobInfo.isIncrease = this.form.isIncrease;
          localStorage.setItem("ejobInfo", JSON.stringify(ejobInfo));
          //跟新数据成功跳到下一步
          this.$router.push("/addDataSourceStep3");
        }
      });
    },

    getEjobInfo() {
      //  if(this.ejobId){
      // 如果是编辑进来就赋值
      reqEjobInfo({ ejobId: this.ejobId }).then(res => {
        const ejobInfo = res.repData.ejobVO;
        // 1.第一步 覆盖localStorage 中的数据  后面都要用到
        localStorage.setItem("ejobInfo", JSON.stringify(ejobInfo));

        this.form.maxWriteSpeed = ejobInfo.maxWriteSpeed; // 设置最大写入数据默认值
        this.form.maxReadSpeed = ejobInfo.maxReadSpeed; // 设置最大读取数据默认值
        this.form.isIncrease = ejobInfo.isIncrease || 0;
        this.form.readFrequency = ejobInfo.readFrequency;
      });
    }
    // }
  },
  mounted() {
    // this.form.isIncrease = 0 ;   //设置 默认为全量数据
    // this.form.maxWriteSpeed = this.temp1 = 200;  // 设置最大写入数据默认值
    this.getEjobInfo();
    this.projectId = localStorage.getItem("projectId");
  }
};
</script>

<style scoped lang="less">
.width200 {
  width: 200px;
}
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
  h4 {
    line-height: 40px;
  }
  .unit {
    float: left;
    margin-top: 10px;
    color: #ccc;
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
</style>
