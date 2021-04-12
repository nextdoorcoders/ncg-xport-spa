<script>
export default {
  data() {
    return {
      contactResource: {
        type: 'phone',
        value: null
      }
    }
  },
  methods: {
    onClose() {
      this.$modal.close()
    },
    onOk() {
      this.$store.dispatch('account/contact/create', {
            data: this.contactResource
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
      <h5 class="modal-title">Add new contact information</h5>
      <button @click="onClose" class="close"><i class="ki ki-close"></i></button>
    </div>
    <div class="modal-body">
      <div class="form-group row">
        <label class="col-3 col-form-label" for="type">Type:</label>
        <div class="col-9">
          <select v-model="contactResource.type" class="form-control" id="type">
            <option value="phone">Phone</option>
            <option value="email">Email</option>
            <option value="website">Website</option>
            <option value="address">Address</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-3 col-form-label" for="value">Value</label>
        <div class="col-9">
          <textarea v-if="contactResource.type === 'address'" v-model="contactResource.value" class="form-control" id="value" rows="10"></textarea>
          <input v-else v-model="contactResource.value" class="form-control" id="value"/>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button @click="onOk" class="btn font-weight-bold btn-primary">Add information</button>
      <button @click="onClose" class="btn font-weight-bold btn-secondary">Close</button>
    </div>
  </div>
</template>