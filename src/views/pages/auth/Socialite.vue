<script>
import {hasToken, loginResponse} from '../../../scripts/service/token.service'

export default {
  mounted() {
    let provider = this.$route.params.provider
    let query = this.$route.query

    this.$store.dispatch('marketing/account/handleProviderCallback', {
          provider: provider,
          data: query
        })
        .then(response => {
          if (!hasToken()) {
            loginResponse(response)
          }

          let restorePage = JSON.parse(window.localStorage.getItem('restorePage'))

          this.$router.push({
            name: restorePage.name,
            params: restorePage.params
          })

          window.localStorage.removeItem('restorePage')
        })
  }
}
</script>

<template>
  <div class="login-container order-2 order-lg-1 d-flex flex-center flex-row-fluid px-7 pt-lg-0 pb-lg-0 pt-4 pb-6 bg-white">
    <div class="spinner spinner-track spinner-primary spinner-lg"></div>
  </div>
</template>
