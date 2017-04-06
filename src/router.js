import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/views/Hello'
import Login from '@/views/Login'
import Main from '@/views/Main'
import Disk from '@/views/Disk'

import AppBar from '@/components/AppBar'
import LoginForm from '@/components/LoginForm'
import UserInfo from '@/components/UserInfo'
import WebDisk from '@/components/WebDisk'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      children:[]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
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

Vue.component('my-appbar',AppBar)
Vue.component('login-form',LoginForm)
Vue.component('user-info',UserInfo)
Vue.component('web-disk',WebDisk)

export default router
