<script>
export default {
  methods: {
    onClose() {
      this.$modal.close()
    },
    onOk() {
      this.$store.dispatch('account/user/logout')
          .then(response => {
            this.onClose()

            this.$router.push({
              name: 'auth.login'
            })
          })
    }
  }
}
</script>

<template>
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Logout</h5>
      <button @click="onClose" class="close"><i class="ki ki-close"></i></button>
    </div>
    <div class="modal-body">
      Are you sure want to close the current session and log out?
    </div>
    <div class="modal-footer">
      <button @click="onOk" class="btn font-weight-bold btn-danger">Exit</button>
      <button @click="onClose" class="btn font-weight-bold btn-secondary">Cancel</button>
    </div>
  </div>
</template>
