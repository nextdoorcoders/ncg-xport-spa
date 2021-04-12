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
      this.$store.dispatch('trigger/group/update', {
            group: this.groupResource.id,
            data: this.groupResource
          })
          .then(response => {
            this.onClose()

            this.$emit('groupUpdated', response.data)
          })
    }
  }
}
</script>

<template>
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Updating {{ groupResource.name }}</h5>
      <button @click="onClose" class="close"><i class="ki ki-close"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-group row">
        <label class="col-3 col-form-label">Name</label>
        <div class="col-9">
          <input v-model="groupResource.name" class="form-control"/>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-3 col-form-label">Description</label>
        <div class="col-9">
          <textarea v-model="groupResource.desc" class="form-control"></textarea>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button @click="onOk" class="btn font-weight-bold btn-primary">Update group</button>
      <button @click="onClose" class="btn font-weight-bold btn-secondary">Close</button>
    </div>
  </div>
</template>
