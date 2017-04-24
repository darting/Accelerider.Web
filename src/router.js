import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/Index'
import Login from '@/views/Login'
import Main from '@/views/Main'
import Disk from '@/views/Disk'
import Share from '@/views/Share'

import RegisterForm from '@/components/RegisterForm'
import LoginForm from '@/components/LoginForm'
import BindingForm from '@/components/BindingForm'
import UserInfo from '@/components/UserInfo'
import WebDisk from '@/components/WebDisk'
import DiskFileList from '@/components/FileList'
import ShareList from '@/components/ShareList'

Vue.use(Router)
const router = new Router({
  mode:'history',
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
          sessionStorage.removeItem('accessUk');
          next()
        }
      }
    },
    {
      path:'/disk',
      name:'disk',
      component:Disk,
      beforeEnter: (to, from, next) => {
        if (!to.query.path) {
          next({ path: '/disk', query: {path:'/'}})
        }
        if (!sessionStorage.getItem('accessToken') || !sessionStorage.getItem('accessUk')) {
          next({
            path: '/main',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      }
    },
    {
      path:'/share',
      name:'share',
      component:Share
    }
  ]
});

Vue.component('register-form',RegisterForm)
Vue.component('login-form', LoginForm)
Vue.component('bind-form', BindingForm)
Vue.component('user-info',UserInfo)
Vue.component('file-list',DiskFileList)
Vue.component('web-disk',WebDisk)
Vue.component('share-list',ShareList)

export default router
