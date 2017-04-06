// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

//- deprecated
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
//

Vue.config.productionTip = false
Vue.prototype.$ajax = axios.create({
  baseURL: 'http://api.pescn.top/',
  //timeout: 1000,
  headers: {}
});

Vue.use(ElementUI)
Vue.use(MuseUI)//deprecated

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
