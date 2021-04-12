<script>
import Fragment from '../Fragment'
import filter from '../../../scripts/mixin/filter.mixin'

export default {
  components: {
    Fragment
  },
  mixins: [
    filter
  ],
  props: {
    countryId: {
      default: null
    },
    stateId: {
      default: null
    },
    cityId: {
      default: null
    }
  },
  data() {
    return {
      localCountryId: null,
      localStateId: null,
      localCityId: null,

      countryResource: null,
      stateResource: null,
      cityResource: null,

      countryCollection: [],
      stateCollection: [],
      cityCollection: []
    }
  },
  computed: {
    id: function () {
      return this._uid
    },
    lastId: function () {
      /*
        Возвращаем последний выбранный ID согласно иерархии
       */
      if (!_.isNull(this.localCityId)) {
        return this.localCityId
      } else {
        if (!_.isNull(this.localStateId)) {
          return this.localStateId
        } else {
          if (!_.isNull(this.localCountryId)) {
            return this.localCountryId
          }
        }
      }
    }
  },
  watch: {
    /*
      При любом изменении любого поля - генерируются события.
      При изменении поля страны - очищается список штатов и городов
      с удалением выбранных значений, отправляем события. Все поля
      связаны по иерархии. Событие 'change' генерируется только один
      раз когда одно из множетсва полей было изменено. Событие
      сработает в момент когда последнее поле в цепочке будет
      автоматически изменено
     */
    localCountryId(newValue, oldValue) {
      this.stateCollection = []

      if (newValue !== null) {
        this.loadStates(newValue)
      }

      if (this.localStateId === null) {
        this.$emit('change', this.lastId)
      }

      if (oldValue !== null) {
        this.localStateId = null
      }

      this.$emit('country-selected', this.localCountryId)
    },
    localStateId(newValue, oldValue) {
      this.cityCollection = []

      if (newValue !== null) {
        this.loadCities(newValue)
      }

      if (this.localCityId === null) {
        this.$emit('change', this.lastId)
      }

      if (oldValue !== null) {
        this.localCityId = null
      }

      this.$emit('state-selected', this.localStateId)
    },
    localCityId(newValue, oldValue) {
      this.$emit('change', this.lastId)

      this.$emit('city-selected', this.localCityId)
    }
  },
  mounted() {
    // TODO: Компонент следует использовать только синхронно, после того как входные данные подгружены
    this.loadCountries()

    if (!_.isNull(this.cityId)) {
      this.loadCity(this.cityId)
    } else {
      if (!_.isNull(this.stateId)) {
        this.loadState(this.stateId)
      } else {
        if (!_.isNull(this.countryId)) {
          this.loadCountry(this.countryId)
        }
      }
    }
  },
  methods: {
    loadCountries() {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('geo/location/get')
            .then(response => {
              this.countryCollection = response.data

              resolve(response)
            })
      })
    },
    loadCountry(country) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('geo/location/read', {
              location: country
            })
            .then(response => {
              this.countryResource = response.data
              this.localCountryId = this.countryResource.id

              resolve(response)
            })
      })
    },
    loadStates(country) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('geo/location/read', {
              location: country
            })
            .then(response => {
              this.stateCollection = response.data.children

              resolve(response)
            })
      })
    },
    loadState(state) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('geo/location/read', {
              location: state
            })
            .then(response => {
              this.stateResource = response.data
              this.localStateId = this.stateResource.id

              this.loadCountry(this.stateResource.parent_id)

              resolve(response)
            })
      })
    },
    loadCities(state) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('geo/location/read', {
              location: state
            })
            .then(response => {
              this.cityCollection = response.data.children

              resolve(response)
            })
      })
    },
    loadCity(city) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('geo/location/read', {
              location: city
            })
            .then(response => {
              this.cityResource = response.data
              this.localCityId = this.cityResource.id

              this.loadState(this.cityResource.parent_id)

              resolve(response)
            })
      })
    }
  }
}
</script>

<template>
  <Fragment>
    <div class="row">
      <div class="form-group col-4">
        <label for="country_id">Country</label>
        <select v-model="localCountryId" :disabled="countryCollection.length === 0" class="form-control" id="country_id">
          <option :value="null">Select country</option>
          <option v-for="country in countryCollection" :value="country.id">{{ country.name|trans }}</option>
        </select>
      </div>
      <div class="form-group col-4">
        <label for="state_id">Region</label>
        <select v-model="localStateId" :disabled="stateCollection.length === 0" class="form-control" id="state_id">
          <option :value="null">Select region</option>
          <option v-for="state in stateCollection" :value="state.id">{{ state.name|trans }}</option>
        </select>
      </div>
      <div class="form-group col-4">
        <label for="city_id">City</label>
        <select v-model="localCityId" :disabled="cityCollection.length === 0" class="form-control" id="city_id">
          <option :value="null">Select city</option>
          <option v-for="city in cityCollection" :value="city.id">{{ city.name|trans }}</option>
        </select>
      </div>
    </div>
  </Fragment>
</template>
