<script>
export default {
  name: "ModalData",
  methods: {
    onClose() {
      this.$modal.close()
    },
  },
}
</script>

<template>
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">{{this.$modal.data.name}}</h5>
      <button @click="onClose" class="close"><i class="ki ki-close"></i></button>
    </div>
    <div class="modal-body">
      {{this.$modal.data.message}}
    </div>
    <div class="modal-footer">
      <button @click="onClose" class="btn font-weight-bold btn-secondary">Ok</button>
    </div>
  </div>
</template>

