import Vue from 'vue'
import Router from 'vue-router'

import NotFound from '@/views/404.vue'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Home from '@/views/Home'

import Disk from '@/views/Disk'
import DDisk from '@/views/disk/BDDisk'
import DM4s from '@/views/disk/M4sDisk'
import Square from '@/views/Square'

import UserInfo from '@/components/UserInfo'
import BindingForm from '@/components/BindingForm'

Vue.use(Router)

Vue.component('user-info', UserInfo)
Vue.component('bind-form', BindingForm)

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
      path: '/signup',
      component: Register,
      name: '',
      hidden: true
    },
    {
      path:'/',
      component:Home,
      name:'HOME',
      redirect: { path: '/disk' },
      meta: { requiresAuth: true },
      children:[
        {
          path: '/disk', component:Disk, name:'网盘',
          redirect: { path: '/disk/home' },
          children:[
            {
              path:'home', component:DDisk, name:'百度云',
            },
            {
              path:'m4s', component:DM4s, name:'四酱云',
            },
          ]
        },
        {
          path: '/square',
          component: Square,
          name: '广场',
        },
      ]
    },
    {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!sessionStorage.getItem('accessToken')) {
      next({ path: '/login', query: {redirect: to.fullPath} })
    }
    if (!to.query.path) {
      next({query: {path:'/'}})
    }
  }
  next()
});

export default router