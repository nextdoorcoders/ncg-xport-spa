<script>
import Fragment from '../../components/Fragment'
import GeoSelect from '../../components/geo/GeoSelect'

export default {
  components: {
    GeoSelect,
    Fragment
  },
  data() {
    return {
      mapResource: {
        project_id: this.$route.query.project_id ?? null,
        name: null,
        desc: null,
        shutdown_delay: 30
      },

      projectCollection: []
    }
  },
  mounted() {
    this.$store.dispatch('marketing/project/get')
        .then(response => {
          this.projectCollection = response.data
        })
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('trigger/map/create', {
            data: this.mapResource
          })
          .then(response => {
            Bus.$emit('refresh-map-list')

            this.$router.push({
              name: 'trigger.map.update',
              params: {
                map: response.data.id
              }
            })
          })
    }
  }
}
</script>

<template>
  <Fragment>
    <!--begin::Subheader-->
    <div class="subheader py-3 py-lg-8 subheader-transparent">
      <div class=" container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <!--begin::Info-->
        <div class="d-flex align-items-center flex-wrap mr-1">

          <!--begin::Page Heading-->
          <div class="d-flex align-items-baseline flex-wrap mr-5">
            <!--begin::Page Title-->
            <h2 class="subheader-title text-dark font-weight-bold my-1 mr-3">Create Trigger Map</h2>
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
                <h3 class="card-title">Create Trigger Map</h3>
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
                <button @click="onSubmit" class="btn btn-success mr-2">Create map</button>
                <router-link :to="{name: 'dashboard'}" class="btn btn-secondary">Cancel</router-link>
              </div>
            </div>
            <!--end::Card-->
          </div>
        </div>
      </div>
      <!--end::Container-->
    </div>
    <!--end::Entry-->
  </Fragment>
</template>
