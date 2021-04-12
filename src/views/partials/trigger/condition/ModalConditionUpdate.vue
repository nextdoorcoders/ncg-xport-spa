<script>
import CalendarForm from './form/Calendar'
import CurrencyForm from './form/Currency'
import KeywordForm from './form/Keyword'
import MediaSyncForm from './form/MediaSync'
import UptimeRobotForm from './form/UptimeRobot'
import WeatherForm from './form/Weather'
import filter from '../../../../scripts/mixin/filter.mixin'

export default {
  components: {
    CalendarForm,
    CurrencyForm,
    KeywordForm,
    MediaSyncForm,
    UptimeRobotForm,
    WeatherForm
  },
  mixins: [
    filter
  ],
  props: {
    conditionResource: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      isWaitingRequest: false
    }
  },
  methods: {
    onClose() {
      this.$modal.close()
    },
    onOk() {
      this.isWaitingRequest = true

      this.$store.dispatch('trigger/condition/update', {
            condition: this.conditionResource.id,
            data: this.conditionResource
          })
          .then(response => {
            this.onClose()

            this.$emit('conditionUpdated', response.data)
          })
          .catch(error => {
            this.isWaitingRequest = false
          })
    }
  }
}
</script>

<template>
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Updating {{ this.conditionResource.vendorType.name|trans }}</h5>
      <button @click="onClose" class="close"><i class="ki ki-close"></i></button>
    </div>
    <div class="modal-body">
      <CalendarForm v-if="conditionResource.vendorType.vendor.type === 'calendar'" :condition-resource="conditionResource"/>
      <CurrencyForm v-if="conditionResource.vendorType.vendor.type === 'currency'" :condition-resource="conditionResource"/>
      <KeywordForm v-if="conditionResource.vendorType.vendor.type === 'keyword'" :condition-resource="conditionResource"/>
      <MediaSyncForm v-if="conditionResource.vendorType.vendor.type === 'media_sync'" :condition-resource="conditionResource"/>
      <UptimeRobotForm v-if="conditionResource.vendorType.vendor.type === 'uptime_robot'" :condition-resource="conditionResource"/>
      <WeatherForm v-if="conditionResource.vendorType.vendor.type === 'weather'" :condition-resource="conditionResource"/>
    </div>
    <div class="modal-footer">
      <button @click="onOk" class="btn font-weight-bold btn-primary" :disabled="isWaitingRequest">Update condition</button>
      <button @click="onClose" class="btn font-weight-bold btn-secondary">Close</button>
    </div>
  </div>
</template>
