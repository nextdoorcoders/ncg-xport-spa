<script>
import Fragment from '../../../../components/Fragment'

export default {
  components: {
    Fragment
  },
  props: {
    conditionResource: {
      type: Object
    }
  },
  data() {
    return {
      currencyCollection: []
    }
  },
  computed: {
    id: function () {
      return this._uid
    }
  },
  mounted() {
    this.$store.dispatch('vendor/currency/get')
        .then(response => {
          this.currencyCollection = response.data
        })
  }
}
</script>

<template>
  <Fragment>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group row">
          <label class="col-12 col-form-label" :for="`currency_from_id-${id}`">From currency</label>
          <div class="col-12">
            <select v-model="conditionResource.parameters.from_currency_id" :disabled="currencyCollection.length === 0" class="form-control" :id="`currency_from_id-${id}`">
              <option :value="null">Select source currency</option>
              <option v-for="currency in currencyCollection" :value="currency.id">{{ currency.code }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group row">
          <label class="col-12 col-form-label" :for="`currency_to_id-${id}`">To currency</label>
          <div class="col-12">
            <select v-model="conditionResource.parameters.to_currency_id" :disabled="currencyCollection.length === 0" class="form-control" :id="`currency_to_id-${id}`">
              <option :value="null">Select target currency</option>
              <option v-for="currency in currencyCollection" :value="currency.id">{{ currency.code }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div v-if="conditionResource.vendorType.type !== 'national'" class="form-group row">
      <label class="col-12 col-form-label" :for="`rate_type-${id}`">Type of rate</label>
      <div class="col-12">
        <select v-model="conditionResource.parameters.rate_type" class="form-control" :id="`rate_type-${id}`">
          <option value="purchase">Purchase value of rate</option>
          <option value="average">Average value of purchase and sale</option>
          <option value="sale">Sale value of rate</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group row">
          <label class="col-12 col-form-label" :for="`rate-min-${id}`">Min value</label>
          <div class="col-12">
            <input v-model="conditionResource.parameters.rate_min" class="form-control" :id="`rate-min-${id}`"/>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group row">
          <label class="col-12 col-form-label" :for="`rate-max-${id}`">Max value</label>
          <div class="col-12">
            <input v-model="conditionResource.parameters.rate_max" class="form-control" :id="`rate-max-${id}`"/>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="form-group row">
          <div class="col-12">
            <div class="checkbox-inline">
              <label class="checkbox"><input v-model="conditionResource.is_inverted" type="checkbox" name="is_inverted"><span></span>Invert condition</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Fragment>
</template>
