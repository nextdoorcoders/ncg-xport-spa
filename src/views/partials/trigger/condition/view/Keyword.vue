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
    <template v-if="conditionResource.vendorType.type === 'checkRank'">
      <div class="text-inverse-success font-weight-bolder font-size-h2 mt-3">
        {{ conditionResource.keyword.keyword }}
      </div>
      <div class="text-inverse-success font-weight-bold font-size-lg mt-1">{{ conditionResource.vendorType.name|trans }}</div>
      <template v-if="conditionResource.keyword && conditionResource.keyword.rates.length > 0">
        <div class="text-inverse-success font-weight-bold font-size-lg mt-1">Search keyword rank: {{ conditionResource.keyword.rates[0].value }}</div>
      </template>
      <div class="text-inverse-success font-weight-bold font-size-lg mt-1">Min: {{ conditionResource.parameters.min_rank }} | Max: {{ conditionResource.parameters.max_rank }}</div>
      <div class="text-inverse-success font-weight-bold font-size-lg mt-1">Days ago: {{ conditionResource.parameters.days_ago }}</div>
      <div class="text-inverse-success font-weight-bold font-size-lg mt-1">Location: {{ conditionResource.vendorLocation.location.name|trans }}</div>
    </template>
    <template v-if="conditionResource.vendorType.type === 'compareRank'">
      <div class="text-inverse-success font-weight-bolder font-size-h2 mt-3">
        {{ conditionResource.keyword.keyword }} <span class="font-size-lg">compare with</span> {{ conditionResource.referenceKeyword.keyword }}
      </div>
      <div class="text-inverse-success font-weight-bold font-size-lg mt-1">{{ conditionResource.vendorType.name|trans }}</div>
      <template v-if="conditionResource.keyword && conditionResource.keyword.rates.length > 0">
        <div class="text-inverse-success font-weight-bold font-size-lg mt-1">Search keyword rank: {{ conditionResource.keyword.rates[0].value }}</div>
      </template>
      <template v-if="conditionResource.referenceKeyword && conditionResource.referenceKeyword.rates.length > 0">
        <div class="text-inverse-success font-weight-bold font-size-lg mt-1">Reference keyword rank: {{ conditionResource.referenceKeyword.rates[0].value }}</div>
      </template>
      <div class="text-inverse-success font-weight-bold font-size-lg mt-1">Type: {{ conditionResource.parameters.rate_type }}</div>
      <div class="text-inverse-success font-weight-bold font-size-lg mt-1">Days ago: {{ conditionResource.parameters.days_ago }}</div>
      <div class="text-inverse-success font-weight-bold font-size-lg mt-1">Location: {{ conditionResource.vendorLocation.location.name|trans }}</div>
    </template>
  </Fragment>
</template>
