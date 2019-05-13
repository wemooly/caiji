import axios from 'axios';
import {
  Message,
  MessageBox
} from 'element-ui';
import store from './../store/index';
import signUtil from '../utils/signUtil';
import {
  setToken,
  setAccessUser,
  delToken,
  delAccessUser
} from "../utils/cookieUtil"

// console.log(process.env.NODE_ENV);
// axios.defaults.baseURL = 'http://10.108.12.66:8080/core';

axios.defaults.baseURL = process.env.BASE_API;

// if (process.env.NODE_ENV == 'development') {
//   // axios.defaults.baseURL = 'http://10.108.12.12:8080/core';
//   axios.defaults.baseURL = 'http://10.108.11.45:8080/core';
// } else if (process.env.NODE_ENV == 'production') {
//   axios.defaults.baseURL = 'http://10.108.11.45:8080/core';
// } else if (process.env.NODE_ENV == 'testing') {
//   axios.defaults.baseURL = 'http://10.108.11.45:8080/core';
// }

const service = axios.create({
  withCredentials: true, //开启withCredentials后，服务器才能拿到你的cookie
  timeout: 40000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=UTF-8'
  },
})

service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    //判断是否存在token，如果存在将每个页面header都添加token
    if (store.state.token) {
      config.headers.common['Authentication-Token'] = store.state.token
    }
    // sign 加密
    let token = '';
    let accessUser = store.state.accessUser;
    if (accessUser != undefined && accessUser != {}) {
      token = store.state.token;
    }

    if ((token == null || token == '') && config.data.hasOwnProperty('token')) {
      token = config.data.token;
    }

    config.data = signUtil.sign(token, config.data);
    return config
  },
  error => {
    // Do something with request error
    // console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.repCode == '0000') {
      return res
    } else if (res.repCode == '0104') {
      // 登录超时或被登出，弹确认框，用户确认后，跳转到登录页面
      MessageBox({
        message: "当前登录已失效或异地登录，请重新登录",
        type: 'error',
        duration: 3 * 1000,
      }).then(() => {
        delToken();
        delAccessUser();
        store.commit('setToken', '')
        store.commit('setAccessUser', '')
        sessionStorage.clear()
        // localStorage.clear() 
        location.reload();
        this.$router.push("/login");
        // window.location.href = "#(pageLimitation)";
      })
    } else {
      return res
      // Message({
      //   message: res.repMsg,
      //   type: 'error',
      //   duration: 3 * 1000
      // })
    }
  },
  error => {
    var errorStatus = error.response.status;
    var errorData = error.response.data;
    var messageTxt = "";
    if (errorStatus != 200) {
      messageTxt = "服务器内部错误，请联系管理员";
    } else {
      messageTxt = '失败原因：' + errorData.repCode + '--' + errorData.repMsg;
    }
    Message({
      message: messageTxt,
      type: 'error',
      duration: 5 * 1000
    })
  }
)

export default function ajax(url, data) {
  return service.post(url, data)
}
// export default service
