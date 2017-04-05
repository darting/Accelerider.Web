import Vue from 'vue'
import Router from 'vue-router'
import AppBar from '@/components/AppBar'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Disk from '@/components/Disk'
import UserInfo from '@/components/UserInfo'

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

Vue.component('custom-appbar',AppBar)
Vue.component('user-info',UserInfo)

export default router
