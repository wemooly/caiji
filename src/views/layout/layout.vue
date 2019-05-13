<template>
  <div class="map">
    <el-container>
      <!--<el-aside width="200px">-->
      <!--<leftBar></leftBar>-->
      <!--</el-aside>-->
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main class="mt30">
          {{ $route.meta }}
          <transition>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/views/layout/header.vue";
import leftBar from "@/views/layout/leftBar.vue";
export default {
  name: "layout",
  data() {
    return {
      inputSearch: "", //搜索
      tabPosition: "1", //tabs,
      tabsData: [
        {
          id: "1",
          name: "进行中"
        },
        {
          id: "2",
          name: "待激活"
        },
        {
          id: "3",
          name: "待完善"
        }
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
      this.$router.push("/addDataSource");
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
  padding: 5px 20px;
  color: #fff;
  line-height: 20px;
}
.li_card-content {
  padding: 20px;
  .data_card {
    border: 1px solid #eee;
    min-height: 270px;
    h4 {
      font-size: 14px;
      border-bottom: 1px solid #eee;
      line-height: 60px;
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
      padding: 20px 0;
      font-size: 12px;
      strong {
        font-weight: 700;
        font-size: 16px;
      }
      .button {
        padding: 10px 16px;
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
      .button2 {
        padding: 10px 16px;
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
    }
  }
}
</style>
