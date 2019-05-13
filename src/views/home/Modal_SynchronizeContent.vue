<template>
  <div>
    <div class>
      选择同步表前，请确认同步规则，
      <el-button class="hidden_btn" v-popover:popover1
        >查看同步规则。</el-button
      >
    </div>
    <el-popover
      ref="popover1"
      placement="top-start"
      title="同步规则"
      width="600"
      trigger="hover"
      content="contentTable"
    ></el-popover>
    <el-form :model="form2">
      <el-form-item label :label-width="formLabelWidth">
        <el-row>
          <el-col :span="18">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="form2.name"
            ></el-input>
          </el-col>
          <el-col :span="6">
            <el-tooltip
              content="支持搜索表名称，
  支持根据 JavaScript 正则表达式搜索。 必须以/开头， 以/或/+flag结尾 （例：/a/，/a/i都合法）"
              placement="top"
              class="ml-20"
            >
              <el-button class="hidden_btn">
                <i class="icon iconfont icon-wenhao"></i>
              </el-button>
            </el-tooltip>
          </el-col>
          <el-col :span="24">
            <el-tree
              :data="data2"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[1]"
              :default-checked-keys="[1]"
              :props="defaultProps"
            ></el-tree>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogFormVisible = false"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal_SynchronizeContent",
  data() {
    return {
      formLabelWidth: "0",
      //选择框
      data2: [
        {
          id: 0,
          label: "全选",
          children: [
            {
              id: 1,
              label: "Tables",
              children: [
                {
                  id: 4,
                  label: "flyway_schema_history"
                },
                {
                  id: 5,
                  label: "t_access_authority"
                },
                {
                  id: 6,
                  label: "t_access_role"
                }
              ]
            },
            {
              id: 2,
              label: "Views",
              children: [
                {
                  id: 7,
                  label: "t_access_role"
                },
                {
                  id: 8,
                  label: "t_platform"
                }
              ]
            }
          ]
        }
      ],
      form2: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  }
};
</script>

<style scoped>
</style>
