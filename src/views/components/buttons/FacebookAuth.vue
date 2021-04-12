<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Sign in with Facebook'
    },
    cssClass: {
      type: String
    }
  },
  data: () => ({
    link: null
  }),
  methods: {
    button: function (event) {
      event.preventDefault()

      this.$store.dispatch('marketing/account/linkToProvider', {
            provider: 'facebook'
          })
          .then(response => {
            window.localStorage.setItem('restorePage', JSON.stringify({
              name: this.$route.name,
              params: this.$route.params,
            }))

            window.localStorage.setItem('restorePosition', JSON.stringify({
              x: window.pageXOffset || document.documentElement.scrollLeft,
              y: window.pageYOffset || document.documentElement.scrollTop
            }))

            window.location = response.data.link
          })
    }
  }
}
</script>

<template>
  <button @click="button" ref="button" class="btn btn-light-primary font-weight-bolder px-8 py-4 font-size-lg" :class="cssClass">
    <span class="svg-icon svg-icon-md">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" version="1.1">
        <path style=" stroke:none;fill-rule:nonzero;fill:rgb(21.960784%,36.078431%,55.686275%);fill-opacity:1;" d="M 5.269531 10.652344 L 7.464844 10.652344 L 7.464844 19.675781 C 7.464844 19.855469 7.609375 20 7.785156 20 L 11.503906 20 C 11.679688 20 11.824219 19.855469 11.824219 19.675781 L 11.824219 10.695312 L 14.347656 10.695312 C 14.511719 10.695312 14.648438 10.570312 14.667969 10.410156 L 15.050781 7.085938 C 15.058594 6.996094 15.03125 6.902344 14.96875 6.835938 C 14.910156 6.765625 14.820312 6.726562 14.730469 6.726562 L 11.824219 6.726562 L 11.824219 4.644531 C 11.824219 4.015625 12.164062 3.699219 12.832031 3.699219 C 12.925781 3.699219 14.730469 3.699219 14.730469 3.699219 C 14.90625 3.699219 15.050781 3.554688 15.050781 3.375 L 15.050781 0.324219 C 15.050781 0.148438 14.90625 0.00390625 14.730469 0.00390625 L 12.113281 0.00390625 C 12.09375 0 12.054688 0 11.992188 0 C 11.539062 0 9.960938 0.0898438 8.714844 1.234375 C 7.335938 2.507812 7.527344 4.027344 7.574219 4.289062 L 7.574219 6.726562 L 5.269531 6.726562 C 5.09375 6.726562 4.949219 6.871094 4.949219 7.050781 L 4.949219 10.328125 C 4.949219 10.507812 5.09375 10.652344 5.269531 10.652344 Z M 5.269531 10.652344 "/>
      </svg>
    </span> {{ label }}
  </button>
</template>
