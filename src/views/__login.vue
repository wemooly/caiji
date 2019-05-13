<template>
  <div class="mt25vh">
    <el-row :gutter="20">
      <el-col :span="8" :offset="8">
        <h2>信息采集登录</h2>
        <el-form ref="logForm" :model="logForm" label-width="80px" :rules="logRules">
          <el-form-item label="用户名" prop="name">
            <el-input placeholder="请输入用户名" v-model.trim="logForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input placeholder="密码必填" v-model.trim="logForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="logForm.checked">记住密码</el-checkbox>
            <!-- <a href="" style="color:#606266">忘记密码</a> -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" style="width:45%">登录</el-button>
            <el-button type="danger" @click="dialogFormVisible = true" style="width:45%;">注册</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 注册的弹出框 -->
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible">
      <el-form ref="regForm" :model="regForm" label-width="80px" :rules="regRules">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="regname">
          <el-input v-model.trim="regForm.regname" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="regpwd">
          <el-input
            v-model.trim="regForm.regpwd"
            autocomplete="off"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onRegister">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from "element-ui";
// import { reqLogin,Register } from "@/api";
import { reqLogin, reqRegister } from "@/api";

export default {
  name: "login",
  data() {
    return {
      logForm: {
        name: "", //登录用户名
        password: "", //登录密码
        checked: true //记住密码,
      },
      regForm: {
        regname: "", //注册用户名
        regpwd: "" // 注册密码
      },
      dialogFormVisible: false,
      formLabelWidth: "150px",
      logRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在2-8个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },

      regRules: {
        regname: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在2-8个字符", trigger: "blur" }
        ],
        regpwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.getCookie();
  },
  methods: {
    onSubmit() {
      this.$refs.logForm.validate(valid => {
        if (valid) {
          if (this.logForm.checked == true) {
            //传入账号名，密码，和保存天数3个参数
            this.setCookie(this.logForm.name, this.logForm.password, 7);
          }
          let loginData = {
            loginAccount: this.logForm.name,
            loginPwd: this.logForm.password
          };
          reqLogin(loginData).then(res => {
            // console.log(res, 9999);
            if (res.repCode == "0000") {
              let repData = res.repData;
              this.$store.commit("SET_TOKEN", repData.token);
              this.$store.commit("SET_ACCESSUSER", repData.userVO);
              // 登录成功跳转到项目首页
              this.$router.push("/projectList");
            }
          });
        } else {
          return false;
        }
      });
    },
    onRegister() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          let registerData = {
            loginAccount: this.regForm.regname,
            loginPwd: this.regForm.regpwd
          };
          reqRegister(registerData).then(res => {
            console.log(res, 888);
            if (res.repCode == "0000") {
              this.$message({
                message: "恭喜你,注册成功",
                type: "success"
              });
              this.dialogFormVisible = false;
              // this.$router.push("/login");
            }
          });
        } else {
          return false;
        }
      });
    },

    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      // username=zs;path=/;express=7天
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        // username=zs;path=/;express=7天
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.logForm.name = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.logForm.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    }
  }
};
</script>

<style scoped lang="less">
.mt25vh {
  margin-top: 25vh;
  h2 {
    margin-bottom: 15px;
  }
}
</style>
