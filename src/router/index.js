import Vue from 'vue';
import Router from 'vue-router';

import NotFound from '@/views/404.vue';
import Register from '@/views/Register';
import Login from '@/views/Login';
import Home from '@/views/Home';

import Disk from '@/views/Disk';
import DDisk from '@/views/disk/BDDisk';
import DM4s from '@/views/disk/M4sDisk';
import Square from '@/views/Square';
import About from '@/views/About';

import UserInfo from '@/components/UserInfo';
import BindingForm from '@/components/BindingForm';

Vue.use(Router);

Vue.component('user-info', UserInfo);
Vue.component('bind-form', BindingForm);

const router = new Router({
  // mode:'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/signup',
      component: Register
    },
    {
      path: '/',
      component: Home,
      redirect: { path: '/disk' },
      meta: { requiresAuth: true },
      children: [
        {
          path: '/disk', name: '网盘', component: Disk,
          iconCls: 'el-icon-plus',
          redirect: { path: '/disk/home' },
          children: [
            {
              path: 'home', name: '百度云', component: DDisk,
              iconCls: 'el-icon-upload'
            },
            {
              path: 'm4s', name: '四酱云', component: DM4s,
              iconCls: 'el-icon-document'
            }
          ]
        },
        {
          path: '/square',
          name: '广场',
          component: Square,
          iconCls: 'el-icon-view'
        },
        {
          path: '/about',
          name: '关于',
          component: About,
          iconCls: 'el-icon-information'
        }
      ]
    },
    {
      path: '/404',
      component: NotFound
    },
    {
      path: '*',
      redirect: { path: '/404' }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!sessionStorage.getItem('accessToken')) {
      next({ path: '/login', query: { redirect: to.fullPath }});
    }
    if (!to.query.path) {
      next({ query: { path: '/' }});
    }
  }
  next();
});

export default router;