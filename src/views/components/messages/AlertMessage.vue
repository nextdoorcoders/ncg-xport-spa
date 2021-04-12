<script>
import Fragment from '../Fragment'

export default {
  components: {
    Fragment
  },
  props: {
    alertMessage: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<template>
  <div class="alert" :class="[{'alert-primary': alertMessage.type === 'success', 'alert-warning': alertMessage.type === 'warning', 'alert-danger': alertMessage.type === 'danger'}]">
    {{ alertMessage.description ? alertMessage.description : alertMessage.title }}
  </div>
</template>
