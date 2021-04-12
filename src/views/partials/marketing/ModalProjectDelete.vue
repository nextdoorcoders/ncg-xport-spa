<script>
export default {
  props: {
    projectResource: {
      required: true,
      type: Object
    }
  },
  methods: {
    onClose() {
      this.$modal.close()
    },
    onOk() {
      this.$store.dispatch('marketing/project/delete', {
            project: this.projectResource.id
          })
          .then(response => {
            this.onClose()

            this.$router.push({
              name: 'dashboard'
            })
          })
    }
  }
}
</script>

<template>
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Deleting {{ projectResource.name }}</h5>
      <button @click="onClose" class="close"><i class="ki ki-close"></i></button>
    </div>
    <div class="modal-body">
      Are you sure want to delete current project?
    </div>
    <div class="modal-footer">
      <button @click="onOk" class="btn font-weight-bold btn-danger">Delete project</button>
      <button @click="onClose" class="btn font-weight-bold btn-secondary">Close</button>
    </div>
  </div>
</template>