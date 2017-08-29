// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import store from './vuex';
import 'normalize.css';
import App from './App';
import router from './router';
import 'font-awesome/css/font-awesome.css'
import restAPI from './libs/restAPI';
import m4sAPI from './libs/m4sAPI';
import squareAPI from './libs/squareAPI';
import Utils from './libs/utils';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

Vue.config.productionTip = false;
Vue.prototype.$restAPI = new restAPI();
Vue.prototype.$m4sAPI = new m4sAPI();
Vue.prototype.$squareAPI = new squareAPI();
Vue.prototype.utils = new Utils();

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
