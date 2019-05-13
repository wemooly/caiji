<template>
  <div>
    <el-steps :active="active" finish-status="finish" align-cente="true">
      <el-step title="新建任务"></el-step>
      <el-step title="任务设置"></el-step>
      <el-step title="配置规则"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  name: "step",
  props: ["index"],
  data() {
    return {
      active: this.index
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped lang="less">
</style>
