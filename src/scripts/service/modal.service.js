import Bus from './utils/bus'
import Vue from 'vue'

const VuModal = {}

VuModal.install = (Vue) => {
  Vue.prototype.$modal = new Vue({
    name: '$modal',
    methods: {
      open(options = null) {
        Bus.$emit('new', options)
      },
      close(index = null) {
        Bus.$emit('close', index)
      }
    }
  })
}

Vue.use(VuModal)
