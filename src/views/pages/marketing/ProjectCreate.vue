<script>
import Fragment from '../../components/Fragment'

export default {
  components: {
    Fragment
  },
  data() {
    return {
      projectResource: {
        name: null,
        is_enabled: true,
        organization_id: null,
        date_start_at: null,
        date_end_at: null,
        account_id: null,
        parameters: {
          account_id: null,
          developer_token: null
        }
      },

      accountCollection: [],
      organizationCollection: []
    }
  },
  mounted() {
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
    onCreate() {
      this.$store.dispatch('marketing/project/create', {
            data: this.projectResource
          })
          .then(response => {
            Bus.$emit('refresh-project-list')

            this.$router.push({
              name: 'marketing.project.update',
              params: {
                project: response.data.id
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
            <h2 class="subheader-title text-dark font-weight-bold my-1 mr-3">Create Project</h2>
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
                <h3 class="card-title">Create project</h3>
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
                <button @click="onCreate" class="btn btn-success mr-2">Create project</button>
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
