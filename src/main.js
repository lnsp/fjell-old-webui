// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import VueMoment from 'vue-moment'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(VueMoment)
Vue.use(VueClipboard)
Vue.component('icon', Icon)
Vue.component('site-header', {
  template: '<h2 style="font-weight: 300; margin-bottom: 0.5rem"><slot></slot></h2>'
})
Vue.component('site-subheader', {
  template: '<h4 style="font-weight: 300, margin-bottom: 0.5rem"><slot></slot></h4>'
})
Vue.component('site-subsubheader', {
  template: '<h5 style="color: #6c757d; margin-bottom: 0.5rem"><slot></slot></h5>'
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
