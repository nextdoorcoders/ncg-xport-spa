import Vue from 'vue'
import App from './../App.vue'
import router from './router'
import store from './store'
import ability from './service/ability.service'

require('./bootstrap')

require('./service/filter.service')
require('./service/modal.service')

new Vue({
  router,
  store,
  ability,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')
