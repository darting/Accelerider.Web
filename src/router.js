import Vue from 'vue'
import Router from 'vue-router'

import NotFound from '@/views/404.vue'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Home from '@/views/Home'

import Disk from '@/views/Disk'
import Square from '@/views/Square'

import UserInfo from '@/components/UserInfo'
import BindingForm from '@/components/BindingForm'
import DiskFileList from '@/components/FileList'

Vue.use(Router)

Vue.component('user-info', UserInfo)
Vue.component('bind-form', BindingForm)
Vue.component('file-list',DiskFileList)

const router = new Router({
  //mode:'history',
  routes: [
    {
      path: '/login',
      component: Login,
      name: '',
      hidden: true
    },
    {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
    },
    {
      path: '/signup',
      component: Register,
      name: '',
      hidden: true
    },
    {
      path:'/',
      component:Home,
      name:'HOME',
      children:[
        { path: '/', redirect: '/disk', hidden: true },
        {
          path: '/disk', component: Disk, name: '网盘',
          beforeEnter: (to, from, next) => {
            if (!to.query.path) {
              next({ path: '/disk', query: {path:'/'}})
            } if (!sessionStorage.getItem('accessToken') ){
              next({ path: '/login', query: {redirect: to.fullPath} })
            } else {
              next()
            }
          }
        },
        { path:'/square', component:Square, name:'广场' },
      ],
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
});

export default router