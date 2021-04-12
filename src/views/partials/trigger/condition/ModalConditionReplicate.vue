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
      this.$store.dispatch('trigger/condition/replicate', {
            condition: this.conditionResource.id
          })
          .then(response => {
            this.onClose()

            this.$emit('conditionReplicated', response.data)
          })
    }
  }
}
</script>

<template>
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Cloning {{ this.conditionResource.vendorType.name|trans }}</h5>
      <button @click="onClose" class="close"><i class="ki ki-close"></i></button>
    </div>
    <div class="modal-body">

    </div>
    <div class="modal-footer">
      <button @click="onOk" class="btn font-weight-bold btn-primary">Clone condition</button>
      <button @click="onClose" class="btn font-weight-bold btn-secondary">Close</button>
    </div>
  </div>
</template>
