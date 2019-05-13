import {
  delToken,
  delAccessUser
} from "../utils/cookieUtil"
import {
  reqLogout
} from "@/api"
//进行异步的登录 请求  
export default {
  async LogOut({
    commit,
    state
  }) {
    // 先调用接口 
    const res = await reqLogout({
      "loginAccount": state.accessUser.loginAccount
    })
    if (res.repCode == "0000") {
      delToken();
      delAccessUser();
      commit('SET_TOKEN', '')
      commit('SET_ACCESSUSER', '')
      sessionStorage.clear()
      localStorage.clear()
      location.reload();
      this.$router.push("/login");
    } else {
      this.$message({
        type: 'error',
        message: res.repMsg
      });
    }
  },
}
