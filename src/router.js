import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Register from '@/views/Register'
import Disk from '@/views/Disk'
import Square from '@/views/Square'

import RegisterForm from '@/components/RegisterForm'
import LoginForm from '@/components/LoginForm'
import UserInfo from '@/components/UserInfo'
import BindingForm from '@/components/BindingForm'
import WebDisk from '@/components/WebDisk'
import DiskFileList from '@/components/FileList'

Vue.use(Router)
const router = new Router({
  //mode:'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children:[],
      beforeEnter :(to, from, next) => {
        if (sessionStorage.getItem('accessToken')) { 
          next({ path: '/disk', query: {path:'/'}})
        } else {
          next()
        }
      }
    },
    {
      path: '/reg',
      name: 'register',
      component: Register
    },
    {
      path:'/disk',
      name:'disk',
      component:Disk,
      beforeEnter: (to, from, next) => {
        if (!to.query.path) {
          next({ path: '/disk', query: {path:'/'}})
        }
        if (!sessionStorage.getItem('accessToken') ){
          next({ path: '/'})
        } else {
          next()
        }
      }
    },
    {
      path:'/square',
      name:'square',
      component:Square
    }
  ]
});

Vue.component('register-form',RegisterForm)
Vue.component('login-form', LoginForm)
Vue.component('user-info', UserInfo)
Vue.component('bind-form', BindingForm)
Vue.component('file-list',DiskFileList)
Vue.component('web-disk',WebDisk)

export default router
