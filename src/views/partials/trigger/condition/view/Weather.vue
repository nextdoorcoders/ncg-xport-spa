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
    <div class="text-inverse-success font-weight-bolder font-size-h2 mt-3">{{ conditionResource.current_value }}</div>
    <div class="text-inverse-success font-weight-bold font-size-lg mt-1">{{ conditionResource.vendorType.name|trans }}</div>
    <div class="text-inverse-success font-weight-bold font-size-lg mt-1">Min: {{ conditionResource.parameters.min }} | Max: {{ conditionResource.parameters.max }}</div>
    <div class="text-inverse-success font-weight-bold font-size-lg mt-1">Location: {{ conditionResource.vendorLocation.location.name|trans }}</div>
  </Fragment>
</template>
