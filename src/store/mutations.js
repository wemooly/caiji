import {
  setToken,
  setAccessUser,
  delToken,
  delAccessUser
} from "../utils/cookieUtil"

export default {
  SET_TOKEN: (state, token) => {
    // console.log("vuex set :" + token);
    state.token = token //设置store中的token
    setToken(token) // 设置token到cookie中
  },
  // 设置用户信息
  SET_ACCESSUSER: (state, accessUser) => {
    // console.log("vuex set :" + JSON.stringify(accessUser));
    // accessUser = {"userId":1,"userName":"admin","password":"e1dfb16a12d837f93911a7b96f9c2819","userType":"system","nikeName":"超级管理员","phone":"18019216253","email":"admin@admin.com","enableFlag":1,"deleteFlag":0,"lastLoginTime":"2018-08-20T14:04:02.000+0000","lastLoginIp":"172.30.16.129","createdBy":"admin","createdTime":"2018-08-20T14:04:02.000+0000","updatedBy":"admin","updatedTime":"2018-08-20T14:04:02.000+0000","authorities":["authorityManage:add","authorityManage:edit","authorityManage:delete","authorityManage:find","roleManage:add","roleManage:edit","roleManage:delete","roleManage:find","roleManage:grantAuthority","userManage:add","userManage:edit","userManage:delete","userManage:find","userManage:resetPassword","userManage:grantRole","codeManage:add","codeManage:edit","codeManage:delete","codeManage:find","parameterManage:add","parameterManage:edit","parameterManage:delete","parameterManage:find","projectManage:add","projectManage:edit","projectManage:delete","projectManage:find"]}
    state.accessUser = accessUser
    setAccessUser(accessUser);
  },
}
