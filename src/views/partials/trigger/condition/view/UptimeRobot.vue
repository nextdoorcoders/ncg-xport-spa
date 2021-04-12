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
    <div class="text-inverse-success font-weight-bolder font-size-h2 mt-3">{{ conditionResource.parameters.settings.friendly_name }}</div>
    <div class="text-inverse-success font-weight-bold font-size-lg mt-1">{{ conditionResource.vendorType.name|trans }}</div>
  </Fragment>
</template>
