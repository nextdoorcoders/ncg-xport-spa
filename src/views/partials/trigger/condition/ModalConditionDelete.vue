<script>
import filter from '../../../../scripts/mixin/filter.mixin'

export default {
  mixins: [
    filter
  ],
  props: {
    conditionResource: {
      required: true,
      type: Object
    }
  },
  methods: {
    onClose() {
      this.$modal.close()
    },
    onOk() {
      this.$store.dispatch('trigger/condition/delete', {
            condition: this.conditionResource.id
          })
          .then(response => {
            this.onClose()

            this.$emit('conditionDeleted')
          })
    }
  }
}
</script>

<template>
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Deleting {{ this.conditionResource.vendorType.name|trans }}</h5>
      <button @click="onClose" class="close"><i class="ki ki-close"></i></button>
    </div>
    <div class="modal-body">
      Are you sure want to delete the selected condition?
    </div>
    <div class="modal-footer">
      <button @click="onOk" class="btn font-weight-bold btn-danger">Delete condition</button>
      <button @click="onClose" class="btn font-weight-bold btn-secondary">Close</button>
    </div>
  </div>
</template>
