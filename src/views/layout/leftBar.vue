<template>
  <div class="left-bar">
    <h2>信息采集系统</h2>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="1">
        <i class="icon iconfont icon-houtaicaozuorizhi-"></i>
        <span slot="title">数据任务</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="icon iconfont icon-jiekouwendang-"></i>
        <span slot="title">文件同步</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="icon iconfont icon-jifenquanliebiao-"></i>
        <span slot="title">数据管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="icon iconfont icon-shanghuhaopeizhi"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "leftBar",
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped lang="less">
.left-bar {
  padding: 20px 0;
  h2 {
    text-align: left;
    color: #6e7e8b;
    text-indent: 24px;
  }
}
</style>
