// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import VueMoment from 'vue-moment'
import Octicon from 'vue-octicon/components/Octicon.vue'
import App from './App'
import router from './router'
import 'vue-octicon/icons'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(VueMoment)
Vue.use(VueClipboard)
Vue.component('octicon', Octicon)
Vue.component('site-header', {
  props: ['title'],
  template: '<h2 style="font-weight: 300; margin-top: 2rem; margin-bottom: 0.5rem">{{ title }}</h2>'
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
