<script>
export default {
  props: {
    groupResource: {
      required: true,
      type: Object
    }
  },
  methods: {
    onClose() {
      this.$modal.close()
    },
    onOk() {
      this.$store.dispatch('trigger/group/delete', {
            group: this.groupResource.id
          })
          .then(response => {
            this.onClose()

            this.$emit('groupDeleted', response.data)
          })
    }
  }
}
</script>

<template>
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Deleting {{ groupResource.name }}</h5>
      <button @click="onClose" class="close"><i class="ki ki-close"></i></button>
    </div>
    <div class="modal-body">
      Are you sure want to delete the selected group?
    </div>
    <div class="modal-footer">
      <button @click="onOk" class="btn font-weight-bold btn-danger">Delete group</button>
      <button @click="onClose" class="btn font-weight-bold btn-secondary">Close</button>
    </div>
  </div>
</template>
