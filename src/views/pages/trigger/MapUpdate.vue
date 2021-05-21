<script>
import {mapState} from 'vuex'
import MapCard from '../../partials/trigger/map/MapCard'
import GoogleCampaigns from '../../partials/trigger/campaign/GoogleCampaigns'
import ImportedCampaigns from '../../partials/trigger/campaign/ImportedCampaigns'
import Fragment from '../../components/Fragment'
import GeoSelect from '../../components/geo/GeoSelect'
import ModalMapDelete from '../../partials/trigger/map/ModalMapDelete'
import MapHistories from '../../partials/trigger/history/MapHistories'

export default {
  components: {
    MapHistories,
    Fragment,
    GeoSelect,
    MapCard,
    GoogleCampaigns,
    ImportedCampaigns
  },
  data() {
    return {
      currentTab: 'triggerMap',

      mapResource: {}
    }
  },
  computed: {
    isLoadedMapResource: function () {
      return !_.isEmpty(this.mapResource)
    },
    ...mapState('marketing/project', [
        'isProjectCollectionLoading',
        'projectCollection'
    ])
  },
  mounted() {
    this.loadMap(this.$route.params.map)
  },
  methods: {
    onSelectTab(tab) {
      this.currentTab = tab
    },
    loadMap(map) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('trigger/map/read', {
              map: map
            })
            .then(response => {
              this.mapResource = response.data

              resolve(response)
            })
      })
    },
    onUpdate(andExit = false) {
      this.$store.dispatch('trigger/map/update', {
            map: this.mapResource.id,
            data: this.mapResource
          })
          .then(response => {
            Bus.$emit('refresh-map-list')

            if (andExit === true) {
              this.$router.push({
                name: 'dashboard'
              })
            }
          })
    },
    onReplicate() {
      this.$store.dispatch('trigger/map/replicate', {
            map: this.mapResource.id
          })
          .then(response => {
            this.$router.push({
              name: 'trigger.map.update',
              params: {
                map: response.data.id
              }
            })
          })
    },
    modalMapDelete() {
      this.$modal.open({
        component: ModalMapDelete,
        props: {
          mapResource: this.mapResource
        }
      })
    }
  }
}
</script>

<template>
  <Fragment v-if="isLoadedMapResource">
    <!--begin::Subheader-->
    <div class="subheader py-3 py-lg-8 subheader-transparent">
      <div class=" container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <!--begin::Info-->
        <div class="d-flex align-items-center flex-wrap mr-1">

          <!--begin::Page Heading-->
          <div class="d-flex align-items-baseline flex-wrap mr-5">
            <!--begin::Page Title-->
            <h2 class="subheader-title text-dark font-weight-bold my-1 mr-3">{{ mapResource.name }}</h2>
            <!--end::Page Title-->
          </div>
          <!--end::Page Heading-->
        </div>
        <!--end::Info-->
      </div>
    </div>
    <!--end::Subheader-->

    <!--begin::Entry-->
    <div class="d-flex flex-column-fluid">
      <!--begin::Container-->
      <div class=" container ">
        <div class="row">
          <div class="col-12">
            <!--begin::Card-->
            <div class="card card-custom gutter-b">
              <div class="card-header">
                <h3 class="card-title">Trigger Map - {{ mapResource.name }}</h3>
                <div class="card-toolbar btn-group">
                  <button @click="onReplicate" class="btn btn-success btn-sm">Replicate</button>
                  <button @click="modalMapDelete" class="btn btn-danger btn-sm">Delete</button>
                </div>
              </div>
              <!--begin::Form-->
              <div class="card-body">
                <div class="row">
                  <div class="col-12 col-md-6">
                    <div class="form-group row">
                      <label class="col-12 col-md-4 col-form-label" for="name">Title</label>
                      <div class="col-12 col-md-8">
                        <input v-model="mapResource.name" class="form-control" id="name"/>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-12 col-md-4 col-form-label" for="project_id">Project</label>
                      <div class="col-12 col-md-8">
                        <select v-model="mapResource.project_id" :disabled="projectCollection.length === 0" class="form-control" id="project_id">
                          <option :value="null">Use as template</option>
                          <option v-for="project in projectCollection" :value="project.id">{{ project.name }}</option>
                        </select>
                        <div class="form-text text-muted">You can change this data in the future,<br/>but this will lead to the <strong>deletion</strong> of all imported digital campaigns</div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="form-group row">
                      <label class="col-12 col-md-4 col-form-label" for="shutdown_delay">Delay, seconds</label>
                      <div class="col-12 col-md-8">
                        <input v-model="mapResource.shutdown_delay" class="form-control" id="shutdown_delay"/>
                        <span class="form-text text-muted">Delay before shutdown campaigns, 0-3600 seconds</span>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-12 col-md-4 col-form-label" for="desc">Description</label>
                      <div class="col-12 col-md-8">
                        <textarea v-model="mapResource.desc" class="form-control" id="desc"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <button @click="onUpdate(false)" class="btn btn-success mr-2">Update</button>
                <button @click="onUpdate(true)" class="btn btn-default mr-2">Update and close</button>
                <router-link :to="{name: 'trigger.map.update', params: {map: mapResource.id}}" class="btn btn-secondary">Cancel</router-link>
              </div>
            </div>
            <!--end::Card-->
          </div>
        </div>

        <div class="row gutter-b">
          <div class="col-12">
            <ul class="nav nav-pills">
              <li class="nav-item">
                <button @click="onSelectTab('triggerMap')" class="nav-link border-0" :class="{'active': currentTab === 'triggerMap'}">
                  <span class="nav-icon"><i class="flaticon2-grids"></i></span>
                  <span class="nav-text">Trigger Map</span>
                </button>
              </li>
              <li v-if="mapResource.project_id" class="nav-item">
                <button @click="onSelectTab('triggerMapHistory')" class="nav-link border-0" :class="{'active': currentTab === 'triggerMapHistory'}">
                  <span class="nav-icon"><i class="flaticon2-grids"></i></span>
                  <span class="nav-text">Trigger Map History</span>
                </button>
              </li>
              <li v-if="mapResource.project_id" class="nav-item">
                <button @click="onSelectTab('googleCampaigns')" class="nav-link border-0" :class="{'active': currentTab === 'googleCampaigns'}">
                  <span class="nav-icon"><i class="flaticon2-layers-1"></i></span>
                  <span class="nav-text">Ads Company</span>
                </button>
              </li>
              <li v-if="mapResource.project_id" class="nav-item">
                <button @click="onSelectTab('importedCampaigns')" class="nav-link border-0" :class="{'active': currentTab === 'importedCampaigns'}">
                  <span class="nav-icon"><i class="flaticon2-rocket-1"></i></span>
                  <span class="nav-text">Digital Campaigns</span>
                </button>
              </li>
            </ul>
            <div class="tab-content mt-5">
              <div v-if="currentTab === 'triggerMap'" class="tab-pane fade active show">
                <MapCard :mapResource="mapResource"/>
              </div>
              <div v-if="currentTab === 'triggerMapHistory'" class="tab-pane fade active show">
                <MapHistories :mapResource="mapResource"/>
              </div>
              <div v-if="currentTab === 'googleCampaigns' && mapResource.project_id" class="tab-pane fade active show">
                <GoogleCampaigns :mapResource="mapResource"/>
              </div>
              <div v-if="currentTab === 'importedCampaigns' && mapResource.project_id" class="tab-pane fade active show">
                <ImportedCampaigns :mapResource="mapResource"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end::Container-->
    </div>
    <!--end::Entry-->
  </Fragment>
</template>
