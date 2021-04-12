<script>
import Fragment from '../../components/Fragment'
import Modal from '../../components/Modal'
import ModalProjectDelete from '../../partials/marketing/ModalProjectDelete'

export default {
  components: {
    Modal,
    Fragment
  },
  data: () => ({
    projectResource: {},

    accountCollection: [],
    organizationCollection: [],
    mapCollection: [],

    isShowProjectDeleteModal: false
  }),
  computed: {
    isLoadedProjectResource: function () {
      return !_.isEmpty(this.projectResource)
    }
  },
  mounted() {
    this.loadProject(this.$route.params.project)
        .then(response => {
          this.loadProjectMaps()
        })

    this.$store.dispatch('marketing/account/get')
        .then(response => {
          this.accountCollection = response.data
        })

    this.$store.dispatch('marketing/organization/get')
        .then(response => {
          this.organizationCollection = response.data
        })
  },
  methods: {
    loadProject(project) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('marketing/project/read', {
              project: project
            })
            .then(response => {
              this.projectResource = response.data

              resolve(response)
            })
      })
    },
    onUpdateProject() {
      this.$store.dispatch('marketing/project/update', {
            project: this.$route.params.project,
            data: this.projectResource
          })
          .then(response => {
            Bus.$emit('refresh-project-list')
          })
    },
    loadProjectMaps() {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('marketing/project/getMaps', {
              project: this.projectResource.id
            })
            .then(response => {
              this.mapCollection = response.data
            })
      })
    },
    onShowProjectDeleteModal() {
      this.$modal.open({
        component: ModalProjectDelete,
        props: {
          projectResource: this.projectResource
        }
      })
    }
  }
}
</script>

<template>
  <Fragment v-if="isLoadedProjectResource">
    <!--begin::Subheader-->
    <div class="subheader py-3 py-lg-8 subheader-transparent">
      <div class=" container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <!--begin::Info-->
        <div class="d-flex align-items-center flex-wrap mr-1">

          <!--begin::Page Heading-->
          <div class="d-flex align-items-baseline flex-wrap mr-5">
            <!--begin::Page Title-->
            <h2 class="subheader-title text-dark font-weight-bold my-1 mr-3">{{ projectResource.name }}</h2>
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
                <h3 class="card-title">Edit the Project</h3>
                <div class="card-toolbar btn-group">
                  <button @click="onShowProjectDeleteModal" class="btn btn-danger btn-sm">Delete project</button>
                </div>
              </div>
              <!--begin::Form-->
              <div class="card-body">
                <div class="row">
                  <div class="col-12 col-md-6">
                    <div class="form-group row">
                      <label class="col-12 col-md-4 col-form-label" for="name">Title</label>
                      <div class="col-12 col-md-8">
                        <input v-model="projectResource.name" class="form-control" id="name"/>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-12 col-md-4 col-form-label" for="organization_id">Organization</label>
                      <div class="col-12 col-md-8">
                        <select v-model="projectResource.organization_id" :disabled="organizationCollection.length === 0" class="form-control" id="organization_id">
                          <option :value="null">Select organization</option>
                          <option v-for="organization in organizationCollection" :value="organization.id">{{ organization.name }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-12 col-md-4 col-form-label">Manual control</label>
                      <div class="col-12 col-md-8">
                        <div class="checkbox-inline">
                          <label class="checkbox"><input v-model="projectResource.is_enabled" type="checkbox" name="is_enabled"><span></span>Enable switching campaign statuses</label>
                        </div>
                        <span class="form-text text-muted">Global switch for all nested trigger maps</span>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-12 col-md-4 col-form-label" for="date_start_at">Date start - end</label>
                      <div class="col-6 col-md-4">
                        <input v-model="projectResource.date_start_at" class="form-control" type="date" id="date_start_at"/>
                      </div>
                      <div class="col-6 col-md-4">
                        <input v-model="projectResource.date_end_at" class="form-control" type="date" id="date_end_at"/>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <h3 class="font-size-lg text-dark font-weight-bold">Project credentials</h3>
                    <h4 class="font-size-sm text-muted mb-6">You can change this data in the future,<br/>but this will lead to the <strong>deletion</strong> of all imported digital campaigns</h4>

                    <div class="form-group row">
                      <label class="col-12 col-md-4 col-form-label" for="account_id">Marketing account</label>
                      <div class="col-12 col-md-8">
                        <select v-model="projectResource.account_id" :disabled="accountCollection.length === 0" class="form-control" id="account_id">
                          <option :value="null">Select account</option>
                          <option v-for="account in accountCollection" :value="account.id">{{ account.email }} ({{ account.provider_name }})</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-12 col-md-4 col-form-label" for="parameters.account_id">Account ID</label>
                      <div class="col-12 col-md-8">
                        <input v-model="projectResource.parameters.account_id" class="form-control" id="parameters.account_id"/>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-12 col-md-4 col-form-label" for="parameters.developer_token">Developer token</label>
                      <div class="col-12 col-md-8">
                        <input v-model="projectResource.parameters.developer_token" class="form-control" type="password" id="parameters.developer_token"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <button @click="onUpdateProject" class="btn btn-success mr-2">Update</button>
                <router-link :to="{name: 'dashboard', params: {project: projectResource.id}}" class="btn btn-secondary">Cancel</router-link>
              </div>
            </div>
            <!--end::Card-->
          </div>
        </div>

        <div class="row gutter-b">
          <div class="col-12">
            <!--begin::Card-->
            <div class="card card-custom gutter-b">
              <div class="card-header">
                <h3 class="card-title">List of Trigger Maps</h3>
                <div class="card-toolbar">
                  <router-link :to="{name: 'trigger.map.create', query: {project_id: this.projectResource.id}}" class="btn btn-primary btn-sm"><i class="fas fa-plus"></i> Create Trigger Map</router-link>
                </div>
              </div>
              <!--begin::Form-->
              <div class="card-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Last refreshed at</th>
                      <th scope="col">Last changed at</th>
                      <th scope="col">Shutdown delay, seconds</th>
                      <th scope="col">Shutdown at</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="mapCollection.length > 0">
                      <tr v-for="map in mapCollection">
                        <td>{{ map.name }}</td>
                        <td>{{ map.refreshed_at|datetime }}</td>
                        <td>{{ map.changed_at|datetime }}</td>
                        <td>{{ map.shutdown_delay }}</td>
                        <td>
                          <template v-if="map.shutdown_in">{{ map.shutdown_in|datetime }}</template>
                          <template v-else>-</template>
                        </td>
                        <td>
                          <span v-if="map.is_enabled" class="label label-inline font-weight-bold label-light-primary text-uppercase">Enabled</span>
                          <span v-else class="label label-inline font-weight-bold label-light-danger text-uppercase">Disabled</span>
                        </td>
                        <td>
                          <router-link :to="{name: 'trigger.map.update', params: {map: map.id}}" class="btn btn-sm btn-clean btn-icon">
                            <span class="svg-icon svg-icon-md">
                              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                  <polygon points="0 0 24 0 24 24 0 24"/>
                                  <rect fill="#000000" opacity="0.3" transform="translate(8.500000, 12.000000) rotate(-90.000000) translate(-8.500000, -12.000000) " x="7.5" y="7.5" width="2" height="9" rx="1"/>
                                  <path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997) "/>
                                </g>
                              </svg>
                            </span>
                          </router-link>
                        </td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr>
                        <td colspan="7" class="text-center">No records found</td>
                      </tr>
                    </template>
                  </tbody>
                </table>
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
