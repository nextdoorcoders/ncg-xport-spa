<script>
export default {
  props: {
    mapResource: {
      type: Object
    }
  },
  data() {
    return {
      isHistoryCollectionLoading: false,
      historyCollection: [],

      intervalTimer: null
    }
  },
  mounted() {
    this.loadMapHistory()

    this.intervalTimer = setInterval(() => {
      this.loadMapHistory()
    }, 6000)
  },
  destroyed() {
    clearInterval(this.intervalTimer)
  },
  methods: {
    loadMapHistory() {
      this.isHistoryCollectionLoading = true

      this.$store.dispatch('trigger/map/getHistories', {
            map: this.mapResource.id
          })
          .then(response => {
            this.historyCollection = response.data
          })
          .then(() => {
            this.isHistoryCollectionLoading = false
          })
    }
  }
}
</script>

<template>
  <!--begin::Card-->
  <div class="card card-custom gutter-b">
    <div class="card-header">
      <h3 class="card-title">Trigger card statuses change history</h3>
    </div>
    <!--begin::Form-->
    <div class="card-body">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date and time</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="isHistoryCollectionLoading">
            <tr>
              <td colspan="5" class="text-center">
                <div class="spinner spinner-track spinner-primary spinner-lg d-inline-block"></div>
              </td>
            </tr>
          </template>
          <template v-else-if="historyCollection.length > 0">
            <tr v-for="(history, index) in historyCollection">
              <th scope="row" class="text-nowrap">{{ index + 1 }}</th>
              <td>{{ history.created_at|datetimes }}</td>
              <td>
                <span v-if="history.is_enabled" class="label label-inline font-weight-bold label-light-primary text-uppercase">Enabled</span>
                <span v-else class="label label-inline font-weight-bold label-light-danger text-uppercase">Disabled</span>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="5" class="text-center">No records found</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
  <!--end::Card-->
</template>
