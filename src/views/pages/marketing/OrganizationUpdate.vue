<script>
import Fragment from '../../components/Fragment'

export default {
  components: {
    Fragment
  },
  data: () => ({
    organizationResource: {}
  }),
  computed: {
    isLoadedOrganizationResource: function () {
      return !_.isEmpty(this.organizationResource)
    }
  },
  mounted() {
    this.loadOrganization(this.$route.params.organization)
  },
  methods: {
    loadOrganization(organization) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('marketing/organization/read', {
              organization: organization
            })
            .then(response => {
              this.organizationResource = response.data

              resolve(response)
            })
      })
    },
    onUpdate() {
      this.$store.dispatch('marketing/organization/update', {
            organization: this.$route.params.organization,
            data: this.organizationResource
          })
          .then(response => {
            Bus.$emit('refresh-organization-list')
          })
    },
    onDelete() {
      this.$store.dispatch('marketing/organization/delete', {
            organization: this.organizationResource.id
          })
          .then(response => {
            Bus.$emit('refresh-organization-list')

            this.$router.push({
              name: 'dashboard'
            })
          })
    },
  }
}
</script>

<template>
  <Fragment v-if="isLoadedOrganizationResource">
    <!--begin::Subheader-->
    <div class="subheader py-3 py-lg-8 subheader-transparent">
      <div class=" container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <!--begin::Info-->
        <div class="d-flex align-items-center flex-wrap mr-1">

          <!--begin::Page Heading-->
          <div class="d-flex align-items-baseline flex-wrap mr-5">
            <!--begin::Page Title-->
            <h2 class="subheader-title text-dark font-weight-bold my-1 mr-3">{{ organizationResource.name }}</h2>
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
                <h3 class="card-title">Edit the Organization</h3>
                <div class="card-toolbar btn-group">
                  <button @click="onDelete" class="btn btn-danger btn-sm">Delete organization</button>
                </div>
              </div>
              <!--begin::Form-->
              <div class="card-body">
                <div class="row">
                  <div class="col-12 col-md-6">
                    <div class="form-group row">
                      <label class="col-12 col-md-4 col-form-label" for="name">Title</label>
                      <div class="col-12 col-md-8">
                        <input v-model="organizationResource.name" class="form-control" id="name"/>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-12 col-md-4 col-form-label" for="zip">ZIP</label>
                      <div class="col-12 col-md-8">
                        <input v-model="organizationResource.zip" class="form-control" id="zip"/>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="form-group row">
                      <label class="col-12 col-md-4 col-form-label" for="email">Email</label>
                      <div class="col-12 col-md-8">
                        <input v-model="organizationResource.email" class="form-control" id="email"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <button @click="onUpdate" class="btn btn-success mr-2">Update</button>
                <router-link :to="{name: 'dashboard', params: {organization: organizationResource.id}}" class="btn btn-secondary">Cancel</router-link>
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
