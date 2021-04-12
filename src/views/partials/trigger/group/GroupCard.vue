<script>
import Fragment from '../../../components/Fragment'
import Draggable from '../../../components/Draggable'
import ConditionCard from '../condition/ConditionCard'
import filter from '../../../../scripts/mixin/filter.mixin'
import Modal from '../../../components/Modal'
import ModalConditionCreate from '../condition/ModalConditionCreate'
import ModalGroupDelete from '../group/ModalGroupDelete'
import ModalGroupUpdate from '../group/ModalGroupUpdate'

export default {
  mixins: [
    filter
  ],
  components: {
    Modal,
    Fragment,
    Draggable,
    ConditionCard
  },
  props: {
    groupResource: {
      type: Object
    }
  },
  data() {
    return {}
  },
  methods: {
    getTriggerMap() {
      this.$emit('onGetTriggerMap')
    },
    updateTriggerMap() {
      this.$emit('onUpdateTriggerMap')
    },
    onShowGroupUpdateModal() {
      this.$modal.open({
        component: ModalGroupUpdate,
        props: {
          groupResource: this.groupResource
        },
        on: {
          groupUpdated: (data) => {
            this.$emit('onGetTriggerMap')
          }
        }
      })
    },
    onShowGroupDeleteModal() {
      this.$modal.open({
        component: ModalGroupDelete,
        props: {
          groupResource: this.groupResource
        },
        on: {
          groupDeleted: () => {
            this.$emit('onGetTriggerMap')
          }
        }
      })
    },
    onShowConditionCreateModal() {
      this.$modal.open({
        component: ModalConditionCreate,
        props: {
          groupResource: this.groupResource
        },
        on: {
          conditionsCreated: () => {
            this.$emit('onGetTriggerMap')
          }
        },
        cssClass: 'modal-xl'
      })
    }
  }
}
</script>

<template>
  <Fragment>
    <header class="kanban-board-header d-flex align-items-center ribbon ribbon-top">
      <div v-if="groupResource.is_enabled" class="ribbon-target bg-primary" style="top: -2px; right: 20px;">ON</div>
      <div v-else class="ribbon-target bg-danger" style="top: -2px; right: 20px;">OFF</div>

      <div class="dropdown dropdown-inline dropdown-menu-right mr-3">
        <button type="button" class="btn btn-primary btn-icon btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="ki ki-bold-more-ver"></i>
        </button>
        <div class="dropdown-menu">
          <button @click="onShowConditionCreateModal" class="dropdown-item">Add triggers</button>
          <div class="dropdown-divider"></div>
          <button @click="onShowGroupUpdateModal" class="dropdown-item">Edit group</button>
          <button @click="onShowGroupDeleteModal" class="dropdown-item">Delete group</button>
        </div>
      </div>
      <div class="kanban-title-board">{{ groupResource.name }}</div>
    </header>
    <Draggable
        :list="groupResource.conditions"
        group="projectTriggers"
        :animation="200"
        @end="updateTriggerMap"
        class="kanban-drag"
    >
      <template v-if="groupResource.conditions.length > 0">
        <ConditionCard
            v-for="conditionResource in groupResource.conditions"
            :key="conditionResource.id"
            :conditionResource="conditionResource"
            @onGetTriggerMap="getTriggerMap"
            @onUpdateTriggerMap="updateTriggerMap"
        ></ConditionCard>
      </template>
      <template v-else>
        <div class="bg-diagonal bg-diagonal-light-primary">
          <div class="d-flex flex-column align-items-center justify-content-between p-10 flex-lg-wrap flex-xl-nowrap">
            <div class="d-flex flex-column mb-5 zindex-5">
              <span class="h4 text-dark text-hover-primary mb-5">Great</span>
              <p class="text-dark-50">Now you can add a trigger</p>
            </div>
            <div class="mt-6 mt-lg-0 mt-xxl-6 flex-shrink-0 zindex-5">
              <button @click="onShowConditionCreateModal" class="btn font-weight-bolder text-uppercase btn-primary py-4 px-6">Add trigger</button>
            </div>
          </div>
        </div>
      </template>
    </Draggable>
    <footer></footer>
  </Fragment>
</template>
