<script>
export default {
  props: {
    importingCampaign: {
      required: true,
      type: Object
    }
  },
  methods: {
    onClose() {
      this.$modal.close()
    },
    onOk() {
      this.onClose()

      this.$emit('onConfirm')
    }
  }
}
</script>

<template>
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Importing {{ importingCampaign.name }}</h5>
      <button @click="onClose" class="close"><i class="ki ki-close"></i></button>
    </div>
    <div class="modal-body">
      Are you sure want to import expired campaign?
    </div>
    <div class="modal-footer">
      <button @click="onOk" class="btn font-weight-bold btn-danger">Yes, I'm sure</button>
      <button @click="onClose" class="btn font-weight-bold btn-secondary">Close</button>
    </div>
  </div>
</template>
