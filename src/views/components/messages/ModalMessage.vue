<script>
import Fragment from '../Fragment'

export default {
  components: {
    Fragment
  },
  props: {
    response: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    onClose() {
      this.$modal.close()
    }
  }
}
</script>

<template>
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">{{ response.message.title }}</h5>
      <button @click="onClose" class="close"><i class="ki ki-close"></i></button>
    </div>
    <div class="modal-body">
      <div class="alert" :class="[{'alert-primary': response.type === 'ok', 'alert-danger': response.type === 'error'}]">
        {{ response.message.description ? response.message.description : response.message.title }}
      </div>

      <ul v-if="response.errors" class="list-group mt-5">
        <template v-for="field in response.errors">
          <li v-for="error in field" class="list-group-item">{{ error }}</li>
        </template>
      </ul>
    </div>
    <div class="modal-footer">
      <button
          @click="onClose"
          class="btn font-weight-bold"
          :class="[{'btn-primary': response.type === 'ok', 'btn-danger': response.type === 'error'}]"
      >Close</button>
    </div>
  </div>
</template>
