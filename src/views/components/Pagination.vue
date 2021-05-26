<script>
import JwPagination from 'jw-vue-pagination';

export default {
  name: "Pagination",
  props: {
    items: Array,
    changePage: Function
  },
  components: {
    JwPagination
  },
}
</script>

<template>
  <div>
    <JwPagination :items="this.items" @changePage="this.changePage" pageSize="5"></JwPagination>
  </div>
</template>