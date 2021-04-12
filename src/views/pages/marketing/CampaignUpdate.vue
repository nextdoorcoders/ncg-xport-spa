<script>
import Fragment from '../../components/Fragment'

export default {
  components: {
    Fragment
  },
  data() {
    return {
      campaignResource: {}
    }
  },
  computed: {
    isLoadedCampaignResource: function () {
      return !_.isEmpty(this.campaignResource)
    }
  },
  mounted() {
    this.loadCampaign(this.$route.params.campaign)
  },
  methods: {
    loadCampaign(campaign) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('marketing/campaign/read', {
              campaign: campaign
            })
            .then(response => {
              this.campaignResource = response.data

              resolve(response)
            })
      })
    },
    onUpdate(andExit = false) {
      this.$store.dispatch('marketing/campaign/update', {
            campaign: this.campaignResource.id,
            data: this.campaignResource
          })
          .then(response => {
            if (andExit === true) {
              this.$router.push({
                name: 'trigger.map.update',
                params: {
                  map: this.campaignResource.map_id
                }
              })
            }
          })
    },
    onDelete() {
      this.$store.dispatch('marketing/campaign/delete', {
            campaign: this.campaignResource.id
          })
          .then(response => {
            this.$router.push({
              name: 'trigger.map.update',
              params: {
                map: this.campaignResource.map_id
              }
            })
          })
    }
  }
}
</script>

<template>
  <Fragment v-if="isLoadedCampaignResource">
    <!--begin::Subheader-->
    <div class="subheader py-3 py-lg-8 subheader-transparent">
      <div class=" container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <!--begin::Info-->
        <div class="d-flex align-items-center flex-wrap mr-1">

          <!--begin::Page Heading-->
          <div class="d-flex align-items-baseline flex-wrap mr-5">
            <!--begin::Page Title-->
            <h2 class="subheader-title text-dark font-weight-bold my-1 mr-3">{{ campaignResource.name }}</h2>
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
                <h3 class="card-title">Edit the Digital campaign</h3>
                <div class="card-toolbar btn-group">
                  <button @click="onDelete" class="btn btn-danger btn-sm">Delete campaign</button>
                </div>
              </div>
              <!--begin::Form-->
              <div class="card-body">
                <div class="row">
                  <div class="col-12 col-md-6">
                    <div class="form-group row">
                      <label class="col-12 col-md-4 col-form-label" for="name">Title</label>
                      <div class="col-12 col-md-8">
                        <input v-model="campaignResource.name" class="form-control" id="name"/>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-12 col-md-4 col-form-label">Manual control</label>
                      <div class="col-12 col-md-8">
                        <div class="checkbox-inline">
                          <label class="checkbox"><input v-model="campaignResource.is_rate_enabled" type="checkbox" name="is_rate_enabled"><span></span>Enable switching campaign rate</label>
                        </div>
                        <span class="form-text text-muted">Set a minimum and maximum rate</span>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-12 col-md-4 col-form-label" for="rate_min">Rates minimum - maximum</label>
                      <div class="col-6 col-md-4">
                        <input v-model="campaignResource.rate_min" class="form-control" type="text" id="rate_min" :disabled="!campaignResource.is_rate_enabled"/>
                      </div>
                      <div class="col-6 col-md-4">
                        <input v-model="campaignResource.rate_max" class="form-control" type="text" id="rate_max" :disabled="!campaignResource.is_rate_enabled"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <button @click="onUpdate(false)" class="btn btn-success mr-2">Update</button>
                <button @click="onUpdate(true)" class="btn btn-default mr-2">Update and close</button>
                <router-link :to="{name: 'trigger.map.update', params: {map: campaignResource.map_id}}" class="btn btn-secondary">Cancel</router-link>
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
