import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      component: (resolve) => {
        require(['@/views/projectList'], resolve)
      },
      hidden: true
    },
    {
      path: '*', //*号表示匹配任意内容
      component: (resolve) => {
        require(['@/views/Login'], resolve)
      },
      hidden: true
    },
    {
      path: '/404',
      component: () =>
        import('@/views/404'),
      hidden: true
    },
    {
      path: '/login',
      component: () =>
        import('@/views/Login'),
      hidden: true
    },
    {
      path: '/index',
      component: (resolve) => {
        require(['@/views/home/home'], resolve)
      },
      meta: {
        requireAuth: true
      },
      hidden: true
    },
    {
      path: '/addDataSourceStep1',
      meta: {
        requireAuth: true
      },
      component: resolve => {
        require(['@/views/home/addDataSourceStep1'], resolve)
      },
      hidden: true
    }, {
      path: '/addDataSourceStep2',
      meta: {
        requireAuth: true
      },
      component: resolve => {
        require(['@/views/home/addDataSourceStep2'], resolve)
      },
      hidden: true
    }, {
      path: '/addDataSourceStep3',
      meta: {
        requireAuth: true
      },
      component: resolve => {
        require(['@/views/home/addDataSourceStep3'], resolve)
      },
      hidden: true
    },
    {
      path: '/fileSynchronization',
      component: (resolve) => {
        require(['@/views/fileSynchronization/fileSynchronization'], resolve)
      },
      meta: {
        requireAuth: true
      },
      hidden: true
    },
    {
      path: '/userManagement',
      component: (resolve) => {
        require(['@/views/userManagement/userManagement'], resolve)
      },
      meta: {
        requireAuth: true
      },
      hidden: true
    },
    {
      path: '/dataManagement',
      component: (resolve) => {
        require(['@/views/dataManagement/dataManagement'], resolve)
      },
      meta: {
        requireAuth: true
      },
      hidden: true
    }, {
      path: '/Details',
      name: "Details",
      component: (resolve) => {
        require(['@/views/home/Details'], resolve)
      },
      meta: {
        requireAuth: true
      },
      hidden: true
    },
    {
      path: '/projectList',
      component: (resolve) => {
        require(['@/views/projectList'], resolve)
      },
      meta: {
        requireAuth: true
      },
      hidden: true
    }
  ]
})
