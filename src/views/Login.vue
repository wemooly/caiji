<template>
  <div class="login-bg">
    <div class="login-bg_pattern">
      <div class="login-bg_left-top-circle"></div>
      <div class="login-bg_left100-top-circle"></div>
      <div class="login-bg_right-top-circle"></div>
      <div class="login-bg_right-bottom-circle"></div>
      <div class="login-bg_left-bottom-circle"></div>
    </div>
    <div class="login-login_box">
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="20" :md="20" :lg="20" :xl="14">
          <div class="grid-content">
            <!--登录-->
            <div class="key">
              <div class="bottom-img"></div>
              <div class="form-info mt14vh pb50" style="margin-left:5vw">
                <el-row :gutter="20">
                  <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="7">
                    <div class="logo"></div>
                    <h3 class="subTitle">信息采集平台</h3>
                    <form>
                      <ul class="user-info mt60">
                        <li class="user-input">
                          <input
                            class="effect"
                            placeholder="请输入用户名"
                            type="text"
                            v-model.trim="logForm.name"
                            required
                          />
                          <label>用户名</label>
                        </li>
                        <li class="user-input">
                          <input
                            class="effect"
                            placeholder="请输入密码"
                            type="password"
                            v-model.trim="logForm.password"
                            required
                            @keyup.enter="onSubmit"
                          />
                          <label>密码</label>
                        </li>
                        <li class="keep-password">
                          <label>
                            <el-checkbox v-model="logForm.checked"
                              >记住密码</el-checkbox
                            >
                          </label>
                        </li>
                        <li class="mt50">
                          <el-button
                            class="buttonSize button-solid goHome"
                            type="primary"
                            @click.prevent="onSubmit"
                            >登&nbsp;&nbsp;录</el-button
                          >
                        </li>
                        <li class="register mt50">
                          没有账号？
                          <el-button
                            class="forget"
                            @click="dialogFormVisible = true"
                            >马上注册 ></el-button
                          >
                        </li>
                      </ul>
                    </form>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 注册的弹出框 -->
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible">
      <el-form
        ref="regForm"
        :model="regForm"
        label-width="80px"
        :rules="regRules"
      >
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="regname"
        >
          <el-input
            v-model.trim="regForm.regname"
            autocomplete="off"
            placeholder="请输入用户名"
          ></el-input>
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
      // logRules:{
      //     name:[
      //       {required:true,message:"请输入用户名",trigger:"blur"},
      //       {min:2,max:8,message:"长度在2-8个字符",trigger:'blur'}
      //     ],
      //     password:[
      //       {required:true,message:"请输入密码",trigger:'blur'},
      //     ]
      // },
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
@import "../assets/theme";
@wathet-blue: #f0f7ff;
@wathet-blue: #f0f7ff;
@color91: #919191;
@coloreE0: #e0e0e0;
@colore666: #666;
:focus {
  outline: none;
}
.login-bg {
  background: @wathet-blue;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
.login-bg_pattern {
  position: absolute;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  .login-bg_left-top-circle,
  .login-bg_left100-top-circle,
  .login-bg_right-top-circle,
  .login-bg_right-bottom-circle,
  .login-bg_left-bottom-circle {
    opacity: 0.45;
    background: #e1eeff;
    border-radius: 74px;
    display: block;
    float: left;
    position: relative;
  }
  .login-bg_left-top-circle {
    width: 300px;
    height: 300px;
    transform: rotate(30deg);
    margin-top: -150px;
    margin-left: 70px;
  }
  .login-bg_left100-top-circle {
    width: 200px;
    height: 200px;
    transform: rotate(30deg);
    margin-top: -150px;
    margin-left: 200px;
  }
  .login-bg_right-top-circle {
    width: 300px;
    height: 400px;
    margin-right: -100px;
    transform: rotate(42deg);
    float: right;
  }
  .login-bg_right-bottom-circle {
    width: 300px;
    height: 300px;
    transform: rotate(30deg);
    bottom: -200px;
    right: 350px;
    position: absolute;
  }
  .login-bg_left-bottom-circle {
    width: 300px;
    height: 300px;
    transform: rotate(-11deg);
    bottom: -50px;
    left: -100px;
    position: absolute;
  }
}
.login-login_box {
  position: absolute;
  display: table;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
  overflow: auto;
  margin: auto;
  .key {
    box-sizing: border-box;
    background: @white url("/static/login/bg-1.png") right top no-repeat;
    box-shadow: 0 0 60px 5px rgba(36, 132, 255, 0.41);
    border-radius: 8px;
    overflow: hidden;
    opacity: 0;
    -webkit-animation: fromBack 0.3s linear 0.1s forwards;
    -moz-animation: fromBack 0.3s linear 0.1s forwards;
    -ms-animation: fromBack 0.3s linear 0.1s forwards;
    animation: fromBack 0.3s linear 0.1s forwards;
    /* -webkit- */
    @-webkit-keyframes fromBack {
      0% {
        -webkit-transform: scale(0);
        opacity: 0;
      }
      100% {
        -webkit-transform: scale(1);
        opacity: 1;
        min-height: 69vh;
        max-height: 90vh;
      }
    }
    /* -moz- */
    @-moz-keyframes fromBack {
      0% {
        -moz-transform: scale(0);
        opacity: 0;
      }
      100% {
        -moz-transform: scale(1);
        opacity: 1;
        height: 69vh;
        min-height: 69vh;
        max-height: 90vh;
      }
    }
    /**/
    @keyframes fromBack {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 1;
        min-height: 69vh;
        max-height: 90vh;
      }
    }
    .bottom-img {
      width: 170px;
      height: 170px;
      display: block;
      position: absolute;
      z-index: 2;
      bottom: 0;
      background: url("/static/login/bg-2.png") left bottom no-repeat;
    }
    .form-info {
      .logo {
        width: 168px;
        height: 76px;
        display: block;
        margin: 0 auto;
        background: url("/static/logo.png") right top no-repeat;
      }
      .user-info {
        padding-left: @px30;
        .user-input {
          position: relative;
          border-bottom: 1px solid @coloreE0;
          padding: 0 20px 0 30px;
          margin-top: 37px;
          height: 30px;
          background: #fff;
          text-align: left;
          .effect ~ label {
            position: relative;
            top: -45px;
            width: 100%;
            color: @color91;
            transition: 0.3s;
            -webkit-transition: 0.1s;
            font-size: @f12;
            letter-spacing: 0.5px;
          }
          .effect:focus ~ label {
            position: relative;
            top: -45px;
            color: @lightblue;
            transition: 0.3s;
            border-left: 3px solid @lightblue;
            margin-left: -30px;
            padding-left: 30px;
          }
          input {
            position: relative;
            width: 100%;
            font-size: 13px;
          }
        }
        .keep-password {
          font-size: @f13;
          letter-spacing: 0;
          margin-top: @px24;
          label {
            .el-checkbox__input.is-checked + .el-checkbox__label {
              color: @color91;
            }
          }
        }
        .goHome {
          background: @lightblue;
          box-shadow: 0 12px 51px -12px @azure;
          border-radius: 100px;
          width: 140px;
          height: 40px;
          display: block;
          margin: @px24 auto;
          font-size: @f18;
          text-align: center;
          line-height: 13px;
        }
        .register {
          font-size: 13px;
          color: #919191;
          text-align: center;
          margin: 25px 0;
          .a {
            color: @lightblue;
            cursor: pointer;
          }
          .a:hover {
            text-decoration: underline;
          }
        }
        .forget {
          font-size: @f13;
          color: @lightblue;
          letter-spacing: 0;
          text-align: right;
          border: none;
          padding: 0;
          text-decoration: underline;
          background: none;
          margin-top: 2px;
        }
      }
    }
  }
}
</style>


