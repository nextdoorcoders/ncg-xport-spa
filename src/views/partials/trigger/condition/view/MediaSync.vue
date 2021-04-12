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
  },
  computed: {
    hasFile: function () {
      return !_.isEmpty(this.conditionResource.parameters)
    }
  }
}
</script>

<template>
  <Fragment>
    <div class="text-inverse-success font-weight-bolder font-size-h2 mt-3">{{ conditionResource.vendorType.name|trans }}</div>
<!--    <div class="text-inverse-success font-weight-bold font-size-lg mt-1">{{ conditionResource.current_value }}</div>-->
<!--    <div v-if="conditionResource.vendorLocation" class="text-inverse-success font-weight-bold font-size-lg mt-1">Location: {{ conditionResource.vendorLocation.location.name|trans }}</div>-->
    <video v-if="hasFile" controls="controls" width="100%" style="margin-top: 0.5rem">
      <source :src="conditionResource.parameters.url" :type="conditionResource.parameters.file_mime_type">
    </video>
  </Fragment>
</template>
