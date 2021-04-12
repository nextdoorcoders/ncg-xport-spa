<script>
import Vue from 'vue'
import {mapGetters} from 'vuex'
import Fragment from './views/components/Fragment'
import Modal from './views/components/Modal'
import ModalMessage from './views/components/messages/ModalMessage'
import HtmlClass from './scripts/service/htmlclass.service'
import {KTApp} from './scripts/template/scripts.bundle'
import {ADD_BODY_CLASSNAME, REMOVE_BODY_CLASSNAME} from './scripts/store/template/htmlclass.store'
import {OVERRIDE_LAYOUT_CONFIG} from './scripts/store/template/config.store'

export default {
  components: {
    Fragment,
    Modal,
    ModalMessage
  },
  data: () => ({
    bus: new Vue()
  }),
  computed: {
    ...mapGetters([
      'layoutConfig'
    ]),

    /**
     * Check if the page loader is enabled
     * @returns {boolean}
     */
    loaderEnabled() {
      return !/false/.test(this.layoutConfig('loader.type'))
    },

    /**
     * Check if container width is fluid
     * @returns {boolean}
     */
    contentFluid() {
      return this.layoutConfig('content.width') === 'fluid'
    },

    /**
     * Page loader logo image using require() function
     * @returns {string}
     */
    loaderLogo() {
      return process.env.BASE_URL + this.layoutConfig('loader.logo')
    },

    /**
     * Check if the left aside menu is enabled
     * @returns {boolean}
     */
    asideEnabled() {
      return !!this.layoutConfig('aside.self.display')
    },

    /**
     * Set the right toolbar display
     * @returns {boolean}
     */
    toolbarDisplay() {
      // return !!this.layoutConfig("toolbar.display");
      return true
    },

    /**
     * Set the subheader display
     * @returns {boolean}
     */
    subheaderDisplay() {
      return !!this.layoutConfig('subheader.display')
    }
  },
  beforeMount() {
    // show page loading
    this.$store.dispatch(ADD_BODY_CLASSNAME, 'page-loading')

    // initialize html element classes
    HtmlClass.init(this.layoutConfig())
  },
  mounted() {
    this.$store.dispatch(OVERRIDE_LAYOUT_CONFIG)

    // Simulate the delay page loading
    setTimeout(() => {
      // Remove page loader after some time
      this.$store.dispatch(REMOVE_BODY_CLASSNAME, 'page-loading')
    }, 2000)
  },
  updated() {
    KTApp.init()
  }
}
</script>

<template>
  <Fragment>
    <Modal/>

    <router-view :bus="bus"></router-view>
  </Fragment>
</template>
