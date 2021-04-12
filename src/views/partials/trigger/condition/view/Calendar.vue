<script>
import DateTime from 'luxon/src/datetime'
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
  data() {
    return {
      intervalTimer: null,
      currentDateTime: DateTime.local(),
      dayOfWeekCollection: {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
      }
    }
  },
  mounted() {
    this.intervalTimer = setInterval(() => {
      this.currentDateTime = DateTime.local()
    }, 1000)
  },
  destroyed() {
    clearInterval(this.intervalTimer)
  },
}
</script>

<template>
  <Fragment>
    <div class="text-inverse-success font-weight-bolder font-size-h2 mt-3">{{ currentDateTime|times(conditionResource.parameters.timezone) }} <span class="font-size-lg ml-4">{{ currentDateTime|date(conditionResource.parameters.timezone) }}</span></div>
    <div class="text-inverse-success font-weight-bold font-size-lg mt-1">{{ conditionResource.vendorType.name|trans }}</div>
    <div class="text-inverse-success font-weight-bold font-size-lg mt-1">
      Start:
      <template v-if="conditionResource.parameters.time_start_at">{{ conditionResource.parameters.time_start_at|times }}</template>
      <template v-else>Any time</template>,
      <template v-if="conditionResource.parameters.date_start_at">{{ conditionResource.parameters.date_start_at|date }}</template>
      <template v-else>Any date</template>
    </div>
    <div class="text-inverse-success font-weight-bold font-size-lg mt-1">
      End:
      <template v-if="conditionResource.parameters.time_end_at">{{ conditionResource.parameters.time_end_at|times }}</template>
      <template v-else>Any time</template>,
      <template v-if="conditionResource.parameters.date_end_at">{{ conditionResource.parameters.date_end_at|date }}</template>
      <template v-else>Any date</template>
    </div>
    <div class="text-inverse-success font-weight-bold font-size-lg mt-1">
      Day of week:
      <template v-if="dayOfWeekCollection[conditionResource.parameters.day_of_week]">{{ dayOfWeekCollection[conditionResource.parameters.day_of_week] }}</template>
      <template v-else>Any</template>
    </div>
    <div class="text-inverse-success font-weight-bold font-size-lg mt-1">
      Timezone:
      <template v-if="conditionResource.parameters.timezone">{{ conditionResource.parameters.timezone }}</template>
      <template v-else>Default timezone</template>
    </div>
  </Fragment>
</template>
