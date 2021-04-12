<script>
import Fragment from '../../../../components/Fragment'
import filter from '../../../../../scripts/mixin/filter.mixin'

export default {
  components: {
    Fragment
  },
  mixins: [
    filter
  ],
  props: {
    conditionResource: {
      type: Object
    }
  }
}
</script>

<template>
  <Fragment>
    <div v-if="conditionResource.fromCurrency && conditionResource.toCurrency" class="text-inverse-success font-weight-bolder font-size-h2 mt-3">
      {{ conditionResource.toCurrency.symbol }} {{ conditionResource.current_value }}
      <span class="font-size-lg ml-4">{{ conditionResource.fromCurrency.code }} / {{ conditionResource.toCurrency.code }}</span>
    </div>
    <div class="text-inverse-success font-weight-bold font-size-lg mt-1">{{ conditionResource.vendorType.name|trans }}</div>
    <div class="text-inverse-success font-weight-bold font-size-lg mt-1">Min: {{ conditionResource.parameters.rate_min }} | Max: {{ conditionResource.parameters.rate_max }}</div>
    <div class="text-inverse-success font-weight-bold font-size-lg mt-1">Type: {{ conditionResource.parameters.rate_type }}</div>
    <div class="text-inverse-success font-weight-bold font-size-lg mt-1">Location: {{ conditionResource.vendorLocation.location.name|trans }}</div>
  </Fragment>
</template>
