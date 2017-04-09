import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/Index'
import Login from '@/views/Login'
import Main from '@/views/Main'
import Disk from '@/views/Disk'

import RegisterForm from '@/components/RegisterForm'
import LoginForm from '@/components/LoginForm'
import UserInfo from '@/components/UserInfo'
import WebDisk from '@/components/WebDisk'
import DiskFileList from '@/components/FileList'
import ShareList from '@/components/ShareList'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: index,
      children:[]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      beforeEnter :(to, from, next) => {
        if (!sessionStorage.getItem('accessToken')) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      }
    },
    {
      path:'/disk',
      name:'disk',
      component:Disk,
      beforeEnter :(to, from, next) => {
        if (!sessionStorage.getItem('accessToken') && !sessionStorage.getItem('accessUk')) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      }
    }
  ]
});

Vue.component('register-form',RegisterForm)
Vue.component('login-form',LoginForm)
Vue.component('user-info',UserInfo)
Vue.component('file-list',DiskFileList)
Vue.component('web-disk',WebDisk)
Vue.component('share-list',ShareList)

export default router
