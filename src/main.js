// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Bus from './libs/eventBus'
import restAPI from './libs/restAPI'
import shareAPI from './libs/shareAPI'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false
Vue.prototype.$restAPI = new restAPI();
Vue.prototype.$shareAPI = new shareAPI();
Vue.prototype.Bus = Bus;

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
