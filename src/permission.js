import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {
  getToken,
  getAccessUser
} from './utils/cookieUtil'


// const whiteList = ['/login'] // 不重定向白名单

// 设置全局的请求拦截

router.beforeEach((to, from, next) => {
  NProgress.start()
  var token = store.getters.token
  var accessUser = store.getters.accessUser
  if (token === '') {
    token = getToken()
    accessUser = getAccessUser()
    if (token !== undefined) {
      store.commit('SET_TOKEN', token)
    }
    if (accessUser !== undefined) {
      store.commit('SET_ACCESSUSER', accessUser)
    }
  }
  if (token) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      next()
      // if (store.getters.accessUser === 0) {
      //   store.dispatch('GetInfo').then(res => { // 拉取用户信息
      //     next()
      //   }).catch((err) => {
      //     store.dispatch('FedLogOut').then(() => {
      //       Message.error(err || 'Verification failed, please login again')
      //       next({ path: '/' })
      //     })
      //   })
      // } else {
      //   next()
      // }
    }
  } else {
    if (to.path == "/login") {
      next()
      NProgress.done()
    } else {
      next("/login") // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
