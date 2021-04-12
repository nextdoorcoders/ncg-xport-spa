<script>
export default {
  props: {
    mapResource: {
      type: Object
    }
  },
  data() {
    return {
      isImportedCampaignCollectionLoading: false,
      importedCampaignCollection: [],

      search: {
        name: ''
      },

      intervalTimer: null
    }
  },
  computed: {
    filteredCampaignCollection() {
      return this.importedCampaignCollection.filter(campaign => {
        return campaign.name.toLowerCase().includes(this.search.name.toLowerCase())
      })
    }
  },
  mounted() {
    this.loadMapCampaigns()

    this.intervalTimer = setInterval(() => {
      this.loadMapCampaigns()
    }, 6000)

    Bus.$on('refresh-campaign-list', () => {
      this.loadMapCampaigns()
    })
  },
  destroyed() {
    clearInterval(this.intervalTimer)
  },
  methods: {
    loadMapCampaigns() {
      this.isImportedCampaignCollectionLoading = true

      this.$store.dispatch('marketing/campaign/get', {
            map: this.mapResource.id
          })
          .then(response => {
            this.importedCampaignCollection = response.data
          })
          .then(() => {
            this.isImportedCampaignCollectionLoading = false
          })
    }
  }
}
</script>

<template>
  <!--begin::Card-->
  <div class="card card-custom gutter-b">
    <div class="card-header">
      <h3 class="card-title">List of Digital campaigns</h3>
    </div>
    <!--begin::Form-->
    <div class="card-body">
      <div class="mb-7">
        <div class="row align-items-center">
          <div class="col-lg-9 col-xl-8">
            <div class="row align-items-center">
              <div class="col-md-4 my-2 my-md-0">
                <div class="input-icon">
                  <input v-model="search.name" type="text" class="form-control" placeholder="Search...">
                  <span><i class="flaticon2-search-1 text-muted"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <table class="table">
        <thead>
        <tr>
          <th scope="col">Campaign ID</th>
          <th scope="col">Name</th>
          <th scope="col">Status</th>
          <th scope="col">Changing</th>
          <th scope="col">Rate</th>
          <th scope="col"><i class="fas fa-link"></i></th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
          <template v-if="isImportedCampaignCollectionLoading">
            <tr>
              <td colspan="5" class="text-center">
                <div class="spinner spinner-track spinner-primary spinner-lg d-inline-block"></div>
              </td>
            </tr>
          </template>
          <template v-else-if="importedCampaignCollection.length > 0">
            <tr v-for="campaign in filteredCampaignCollection">
              <th scope="row" class="text-nowrap">{{ campaign.foreign_campaign_id|adwordsID }}</th>
              <td>{{ campaign.name }}</td>
              <td>
                <span v-if="campaign.is_enabled" class="label label-inline font-weight-bold label-light-primary text-uppercase">Enabled</span>
                <span v-else class="label label-inline font-weight-bold label-light-danger text-uppercase">Disabled</span>
              </td>
              <td>
                <span v-if="campaign.is_rate_enabled" class="label label-inline font-weight-bold label-light-primary text-uppercase">Rate</span>
                <span v-else class="label label-inline font-weight-bold label-light-primary text-uppercase">Status</span>
              </td>
              <td>Min: {{ campaign.rate_min }}; Max: {{ campaign.rate_max }}</td>
              <td>{{ campaign.campaign_count }}</td>
              <td>
                <router-link :to="{name: 'marketing.campaign.update', params: {campaign: campaign.id}}" class="btn btn-sm btn-clean btn-icon" data-toggle="tooltip" title="View digital campaign" data-placement="bottom">
                    <span class="svg-icon svg-icon-md">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect id="bound" x="0" y="0" width="24" height="24"></rect>
                          <circle id="Oval-5" fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle>
                          <path d="M7.96323356,15.1775211 C7.62849853,15.5122561 7.08578582,15.5122561 6.75105079,15.1775211 C6.41631576,14.842786 6.41631576,14.3000733 6.75105079,13.9653383 L11.8939067,8.82248234 C12.2184029,8.49798619 12.7409054,8.4866328 13.0791905,8.79672747 L18.2220465,13.5110121 C18.5710056,13.8308912 18.5945795,14.3730917 18.2747004,14.7220508 C17.9548212,15.0710098 17.4126207,15.0945838 17.0636617,14.7747046 L12.5257773,10.6149773 L7.96323356,15.1775211 Z" id="Path-94" fill="#000000" fill-rule="nonzero" transform="translate(12.500001, 12.000001) rotate(-270.000000) translate(-12.500001, -12.000001) "></path>
                        </g>
                      </svg>
                    </span>
                </router-link>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="5" class="text-center">No records found</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
  <!--end::Card-->
</template>
