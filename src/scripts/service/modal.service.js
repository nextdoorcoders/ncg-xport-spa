import Bus from './utils/bus'
import Vue from 'vue'

const VuModal = {}

VuModal.install = (Vue) => {
  Vue.prototype.$modal = new Vue({
    data: {
      data:null
    },
    name: '$modal',
    methods: {
      open(options = null) {
        this.data = options.data;
        Bus.$emit('new', options)
      },
      close(index = null) {
        Bus.$emit('close', index)
      }
    }
  })
}

Vue.use(VuModal)
