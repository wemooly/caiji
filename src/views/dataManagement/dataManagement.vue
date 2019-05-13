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
        <el-main>
          <div class>
            <h1>开发中,敬请期待</h1>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/views/layout/header.vue";
import leftBar from "@/views/layout/leftBar.vue";
export default {
  name: "dataManagement",
  data() {
    return {};
  },
  components: {
    Header,
    leftBar
  },
  computed: {},
  methods: {}
};
</script>

<style scoped lang="less">
</style>
