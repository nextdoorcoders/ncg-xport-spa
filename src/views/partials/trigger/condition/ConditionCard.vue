<script>
import Modal from '../../../components/Modal'
import CalendarView from './view/Calendar'
import CurrencyView from './view/Currency'
import KeywordView from './view/Keyword'
import MediaSyncView from './view/MediaSync'
import UptimeRobotView from './view/UptimeRobot'
import WeatherView from './view/Weather'
import ModalConditionReplicate from './ModalConditionReplicate'
import ModalConditionUpdate from './ModalConditionUpdate'
import ModalConditionDelete from './ModalConditionDelete'

export default {
  components: {
    Modal,
    CalendarView,
    CurrencyView,
    KeywordView,
    MediaSyncView,
    UptimeRobotView,
    WeatherView
  },
  props: {
    conditionResource: {
      required: true,
      type: Object
    }
  },
  computed: {
    id: function () {
      return this._uid
    },
    isCardNotEmpty: function () {
      return !_.isEmpty(this.conditionResource)
    }
  },
  methods: {
    onShowConditionUpdateModal() {
      this.$modal.open({
        component: ModalConditionUpdate,
        props: {
          conditionResource: this.conditionResource
        },
        on: {
          conditionUpdated: (data) => {
            this.$emit('onGetTriggerMap')
          }
        }
      })
    },
    onShowConditionReplicateModal() {
      this.$modal.open({
        component: ModalConditionReplicate,
        props: {
          conditionResource: this.conditionResource
        },
        on: {
          conditionReplicated: (data) => {
            this.$emit('onGetTriggerMap')
          }
        }
      })
    },
    onShowConditionDeleteModal() {
      this.$modal.open({
        component: ModalConditionDelete,
        props: {
          conditionResource: this.conditionResource
        },
        on: {
          conditionDeleted: () => {
            this.$emit('onGetTriggerMap')
          }
        }
      })
    }
  }
}
</script>

<template>
  <div v-if="isCardNotEmpty" class="kanban-item card card-custom" :class="{'disabled': !conditionResource.is_enabled}" :style="`background-color: ${conditionResource.vendorType.settings.color}`">
    <div class="card-body">
      <span class="svg-icon svg-icon-3x svg-icon-white ml-n1" v-html="conditionResource.vendorType.settings.icon"></span>

<!--      {{ conditionResource.vendorType.vendor.type }}-->

      <div class="float-right">
        <button v-if="conditionResource.is_inverted" type="button" class="btn btn-white btn-icon btn-sm" style="background: #f4ff41;">
          <i class="fas fa-exclamation"></i>
        </button>

        <div class="dropdown dropdown-inline dropdown-menu-right">
          <button type="button" class="btn btn-white btn-icon btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="ki ki-bold-more-hor"></i>
          </button>
          <div class="dropdown-menu">
            <button @click="onShowConditionUpdateModal" class="dropdown-item">Set parameters</button>
            <button @click="onShowConditionReplicateModal" class="dropdown-item">Clone to current group</button>
            <button @click="onShowConditionDeleteModal" class="dropdown-item">Delete from map</button>
          </div>
        </div>
      </div>

      <CalendarView v-if="conditionResource.vendorType.vendor.type === 'calendar'" :condition-resource="conditionResource"/>
      <CurrencyView v-if="conditionResource.vendorType.vendor.type === 'currency'" :condition-resource="conditionResource"/>
      <KeywordView v-if="conditionResource.vendorType.vendor.type === 'keyword'" :condition-resource="conditionResource"/>
      <MediaSyncView v-if="conditionResource.vendorType.vendor.type === 'media_sync'" :condition-resource="conditionResource"/>
      <UptimeRobotView v-if="conditionResource.vendorType.vendor.type === 'uptime_robot'" :condition-resource="conditionResource"/>
      <WeatherView v-if="conditionResource.vendorType.vendor.type === 'weather'" :condition-resource="conditionResource"/>
    </div>
  </div>
</template>

