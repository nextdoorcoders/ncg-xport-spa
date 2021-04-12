<script>
export default {
  props: {
    resourceAccount: {
      required: true,
      type: Object
    }
  },
  methods: {
    onClose() {
      this.$modal.close()
    },
    onOk() {
      this.$store.dispatch('marketing/account/delete', {
            account: this.resourceAccount.id
          })
          .then(response => {
            this.onClose()
          })
    }
  }
}
</script>

<template>
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Deleting marketing account</h5>
      <button @click="onClose" class="close"><i class="ki ki-close"></i></button>
    </div>
    <div class="modal-body">
      This action will also delete all associated data with this account. Are you sure want to delete selected account?
    </div>
    <div class="modal-footer">
      <button @click="onOk" class="btn font-weight-bold btn-danger">Delete account</button>
      <button @click="onClose" class="btn font-weight-bold btn-secondary">Close</button>
    </div>
  </div>
</template>
