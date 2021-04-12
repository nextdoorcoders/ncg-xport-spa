<script>
import GeoSelect from '../../../components/geo/GeoSelect'
import filter from '../../../../scripts/mixin/filter.mixin'

export default {
  components: {
    GeoSelect
  },
  mixins: [
    filter
  ],
  props: {
    groupResource: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      vendorCollection: [],
      conditionCollection: [],

      filter: {
        country_id: null,
        state_id: null,
        city_id: null
      }
    }
  },
  mounted() {
    this.getLocationVendors()
  },
  methods: {
    filterCountry(newValue) {
      this.filter.country_id = newValue
    },
    filterState(newValue) {
      this.filter.state_id = newValue
    },
    filterCity(newValue) {
      this.filter.city_id = newValue
    },
    getLocationVendors(location = null) {
      if (location) {
        this.$store.dispatch('geo/location/readLocationVendors', {
              location: location
            })
            .then(response => {
              this.vendorCollection = response.data
            })
      } else {
        this.$store.dispatch('geo/location/readGlobalVendors')
            .then(response => {
              this.vendorCollection = response.data
            })
      }
    },
    onClose() {
      this.$modal.close()
    },
    onOk() {
      // Создаем состояния из коллекции
      let requests = []

      _.forEach(this.conditionCollection, (value, key) => {
        requests.push(
            this.$store.dispatch('trigger/condition/create', {
              group: this.groupResource.id,
              data: value
            })
            .then(response => {
              this.$emit('conditionCreated', response.data)
            })
        )
      })

      Promise.all(requests)
          .then(response => {
            this.onClose()

            this.$emit('conditionsCreated')
          })
    }
  }
}
</script>

<template>
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Select triggers</h5>
      <button @click="onClose" class="close"><i class="ki ki-close"></i></button>
    </div>
    <div class="modal-body">
      <GeoSelect
          @change="getLocationVendors"
          :country-id="filter.country"
          @country-selected="filterCountry"
          :state-id="filter.state"
          @state-selected="filterState"
          :city-id="filter.city"
          @city-selected="filterCity"
      />

      <table class="table">
        <thead>
          <tr>
            <th width="3rem"></th>
            <th>Title</th>
            <th>Data source</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
        <template v-if="vendorCollection.length > 0">
          <tr v-for="vendorListItem in vendorCollection">
            <td>
              <label class="checkbox checkbox-lg">
                <input type="checkbox" v-model="conditionCollection" :value="vendorListItem">
                <span></span>
              </label>
            </td>
            <td>
              {{ vendorListItem.name|trans }}
              <br/>
              <small>{{ vendorListItem.desc|trans }}</small>
            </td>
            <td>
              <template v-if="vendorListItem.type === 'local'">{{ vendorListItem.vendorType.vendor.source }}</template>
              <template v-else>{{ vendorListItem.vendor.source }}</template>
            </td>
            <td>
              <template v-if="vendorListItem.type === 'local'">{{ vendorListItem.location.name|trans }}</template>
              <template v-else>global trigger</template>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="4" class="text-center">No conditions found. Change filtration</td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
    <div class="modal-footer">
      <button @click="onOk" class="btn font-weight-bold btn-primary">Create conditions</button>
      <button @click="onClose" class="btn font-weight-bold btn-secondary">Close</button>
    </div>
  </div>
</template>
