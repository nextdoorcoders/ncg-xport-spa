<script>
import GroupCard from '../group/GroupCard'
import Modal from '../../../components/Modal'
import Fragment from '../../../components/Fragment'
import ModalGroupCreate from '../group/ModalGroupCreate'

export default {
  components: {
    Fragment,
    Modal,
    GroupCard
  },
  props: {
    mapResource: {
      type: Object
    }
  },
  data() {
    return {
      mapIsEnabled: false,

      isGroupCollectionLoading: false,
      groupCollection: []
    }
  },
  computed: {
    isLoadedMapResource: function () {
      return !_.isEmpty(this.mapResource)
    }
  },
  mounted() {
    this.getTriggerMap()
  },
  methods: {
    getMapStatus() {
      let isEnabled = true

      if (this.groupCollection.length > 0) {
        _.each(this.groupCollection, group => {
          if (group.is_enabled === false) {
            isEnabled = false
          }
        })
      } else {
        isEnabled = false
      }

      this.mapIsEnabled = isEnabled
    },
    getTriggerMap() {
      this.$store.dispatch('trigger/map/getConditions', {
            map: this.mapResource.id
          })
          .then(response => {
            this.groupCollection = response.data

            this.getMapStatus()
          })
    },
    updateTriggerMap() {
      this.$store.dispatch('trigger/map/updateConditions', {
            map: this.mapResource.id,
            data: this.groupCollection
          })
          .then(response => {
            this.groupCollection = response.data

            this.getMapStatus()
          })
    },
    modalGroupCreate() {
      this.$modal.open({
        component: ModalGroupCreate,
        props: {
          mapResource: this.mapResource
        },
        on: {
          groupCreated: (data) => {
            this.getTriggerMap()
          }
        }
      })
    }
  }
}
</script>

<template v-if="isLoadedMapResource">
  <!--begin::Card-->
  <div class="card card-custom gutter-b">
    <div class="card-header">
      <div class="card-title">
        <h3 class="card-label">
          Edit of the Trigger map:
          <span v-if="mapIsEnabled" class="label label-xl label-inline font-weight-bold label-light-primary text-uppercase ml-3">Enabled</span>
          <span v-else class="label label-xl label-inline font-weight-bold label-light-danger text-uppercase ml-3">Disabled</span>
        </h3>
      </div>
      <div class="card-toolbar btn-group">
        <button @click="modalGroupCreate" class="btn btn-success btn-sm">Create new group</button>
      </div>
    </div>
    <div class="card-body">
      <div v-if="isGroupCollectionLoading" class="text-center">
        <div class="spinner spinner-track spinner-primary spinner-lg d-inline-block"></div>
      </div>
      <div v-else-if="groupCollection.length > 0" class="kanban-container">
        <div v-for="groupResource in groupCollection" class="kanban-board" style="width: 295px">
          <GroupCard
              :groupResource="groupResource"
              @onGetTriggerMap="getTriggerMap"
              @onUpdateTriggerMap="updateTriggerMap"
          />
        </div>
      </div>
      <div v-else class="bg-diagonal bg-diagonal-light-primary">
        <div class="d-flex align-items-center justify-content-between p-10 flex-lg-wrap flex-xl-nowrap">
          <div class="d-flex flex-column mr-5 zindex-5">
            <span class="h4 text-dark text-hover-primary mb-5">Let's start</span>
            <p class="text-dark-50">First, create a group. Define triggers for each group</p>
            <p class="text-dark-50">Then import campaigns and enjoy the automation</p>
          </div>
          <div class="ml-6 ml-lg-0 ml-xxl-6 flex-shrink-0 zindex-5">
            <button @click="modalGroupCreate" class="btn font-weight-bolder text-uppercase btn-primary py-4 px-6">Create group</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--end::Card-->
</template>
