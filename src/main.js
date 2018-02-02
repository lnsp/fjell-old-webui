// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap'
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(require('vue-moment'))
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
