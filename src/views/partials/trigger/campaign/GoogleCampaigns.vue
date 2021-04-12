<script>
import Modal from '../../../components/Modal'
import ModalImportExpiredCampaign from './ModalImportExpiredCampaign'

export default {
  components: {
    Modal
  },
  props: {
    mapResource: {
      type: Object
    }
  },
  data() {
    return {
      isGoogleCampaignCollectionLoading: false,
      googleCampaignCollection: [],

      search: {
        name: '',
        status: ''
      },

      intervalTimer: null
    }
  },
  computed: {
    filteredGoogleCampaignCollection() {
      return this.googleCampaignCollection.filter(campaign => {
        let name = campaign.name.toLowerCase()
        let status = campaign.status.toLowerCase()

        return name.includes(this.search.name.toLowerCase()) && status.includes(this.search.status.toLowerCase())
      })
    }
  },
  mounted() {
    this.loadMapGoogleCampaigns()

    this.intervalTimer = setInterval(() => {
      this.loadMapGoogleCampaigns()
    }, 6000)

    Bus.$on('refresh-google-campaign-list', () => {
      this.loadMapGoogleCampaigns()
    })
  },
  destroyed() {
    clearInterval(this.intervalTimer)
  },
  methods: {
    loadMapGoogleCampaigns() {
      this.isGoogleCampaignCollectionLoading = true

      this.$store.dispatch('google/campaign/get', {
            map: this.mapResource.id
          })
          .then(response => {
            this.googleCampaignCollection = response.data
          })
          .then(() => {
            this.isGoogleCampaignCollectionLoading = false
          })
    },
    importCampaign(campaign) {
      let start_date = new Date(campaign.start_date)
      let current_date = new Date()
      let end_date = new Date(campaign.end_date)

      if (start_date <= current_date && current_date <= end_date) {
        this.onImportCampaign(campaign)
      } else {
        this.onShowConfirmImportModal(campaign)
      }
    },
    onImportCampaign(campaign) {
      this.$store.dispatch('marketing/campaign/create', {
            map: this.mapResource.id,
            data: {
              foreign_campaign_id: campaign.id,
              name: campaign.name
            }
          })
          .then(response => {
            Bus.$emit('refresh-campaign-list')

            this.loadProjectGoogleCampaigns()
          })
    },
    onShowConfirmImportModal(campaign) {
      // Показываем модальное окно подтвержения если кампания просрочена
      this.$modal.open({
        component: ModalImportExpiredCampaign,
        props: {
          importingCampaign: campaign
        },
        on: {
          onConfirm: () => {
            this.onImportCampaign(campaign)
          }
        }
      })
    }
  }
}
</script>

<template>
  <!--begin::Card-->
  <div class="card card-custom gutter-b">
    <div class="card-header">
      <h3 class="card-title">List of Google campaigns</h3>
    </div>
    <!--begin::Form-->
    <div class="card-body">
      <div class="mb-7">
        <div class="row align-items-center">
          <div class="col-md-3 my-2 my-md-0">
            <div class="input-icon">
              <input v-model="search.name" type="text" class="form-control" placeholder="Search...">
              <span><i class="flaticon2-search-1 text-muted"></i></span>
            </div>
          </div>
          <div class="col-md-3 my-2 my-md-0">
            <div class="d-flex align-items-center">
              <label class="mr-3 mb-0 d-none d-md-block">Status:</label>
              <select v-model="search.status" class="form-control">
                <option value="">All</option>
                <option value="enabled">Enabled</option>
                <option value="paused">Paused</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <table class="table">
        <thead>
        <tr>
          <th scope="col">Campaign ID</th>
          <th scope="col">Name</th>
          <th scope="col">Date start</th>
          <th scope="col">Date end</th>
          <th scope="col">Status</th>
          <th scope="col"><i class="fas fa-link"></i></th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
          <template v-if="isGoogleCampaignCollectionLoading">
            <tr>
              <td colspan="7" class="text-center">
                <div class="spinner spinner-track spinner-primary spinner-lg d-inline-block"></div>
              </td>
            </tr>
          </template>
          <template v-else-if="googleCampaignCollection.length > 0">
            <tr v-for="campaign in filteredGoogleCampaignCollection">
              <th scope="row" class="text-nowrap">{{ campaign.id|adwordsID }}</th>
              <td>{{ campaign.name }}</td>
              <td>{{ campaign.start_date|date }}</td>
              <td>{{ campaign.end_date|date }}</td>
              <td><span class="label label-inline font-weight-bold" :class="[{'label-light-primary': campaign.status === 'ENABLED'}, {'label-light-danger': campaign.status !== 'ENABLED'}]">{{ campaign.status }}</span></td>
              <td>{{ campaign.campaign_count }}</td>
              <td>
                <button v-if="campaign.is_campaign_attached === false" @click="importCampaign(campaign)" class="btn btn-sm btn-clean btn-icon" data-toggle="tooltip" title="Import digital campaign to Xport" data-placement="bottom">
                    <span class="svg-icon svg-icon-md">
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect id="bound" x="0" y="0" width="24" height="24"></rect>
                          <circle id="Oval-5" fill="#000000" opacity="0.3" cx="12" cy="12" r="10"></circle>
                          <path d="M11,11 L11,7 C11,6.44771525 11.4477153,6 12,6 C12.5522847,6 13,6.44771525 13,7 L13,11 L17,11 C17.5522847,11 18,11.4477153 18,12 C18,12.5522847 17.5522847,13 17,13 L13,13 L13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 L11,13 L7,13 C6.44771525,13 6,12.5522847 6,12 C6,11.4477153 6.44771525,11 7,11 L11,11 Z" id="Combined-Shape" fill="#000000"></path>
                        </g>
                      </svg>
                    </span>
                </button>
                <span v-else class="svg-icon svg-icon-md">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <polygon points="0 0 24 0 24 24 0 24"></polygon>
                        <path d="M6.26193932,17.6476484 C5.90425297,18.0684559 5.27315905,18.1196257 4.85235158,17.7619393 C4.43154411,17.404253 4.38037434,16.773159 4.73806068,16.3523516 L13.2380607,6.35235158 C13.6013618,5.92493855 14.2451015,5.87991302 14.6643638,6.25259068 L19.1643638,10.2525907 C19.5771466,10.6195087 19.6143273,11.2515811 19.2474093,11.6643638 C18.8804913,12.0771466 18.2484189,12.1143273 17.8356362,11.7474093 L14.0997854,8.42665306 L6.26193932,17.6476484 Z" fill="#000000" fill-rule="nonzero" transform="translate(11.999995, 12.000002) rotate(-180.000000) translate(-11.999995, -12.000002)"></path>
                      </g>
                    </svg>
                  </span>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="6" class="text-center">No records found</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
  <!--end::Card-->
</template>
