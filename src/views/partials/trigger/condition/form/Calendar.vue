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
      timezoneCollection: [],
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
  computed: {
    id: function () {
      return this._uid
    }
  },
  mounted() {
    this.$store.dispatch('geo/timezone/get')
        .then(response => {
          this.timezoneCollection = response.data
        })
        // .catch(error => {
        //   Bus.$emit('modal-message', error)
        // })
  }
}
</script>

<template>
  <Fragment>
    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group row">
          <label class="col-12 col-form-label" for="date_start_at">Date start</label>
          <div class="col-12">
            <input v-model="conditionResource.parameters.date_start_at" class="form-control" type="date" id="date_start_at"/>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group row">
          <label class="col-12 col-form-label" for="time_start_at">Time start</label>
          <div class="col-12">
            <input v-model="conditionResource.parameters.time_start_at" class="form-control" type="time" step="1" id="time_start_at"/>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group row">
          <label class="col-12 col-form-label" for="date_end_at">Date end</label>
          <div class="col-12">
            <input v-model="conditionResource.parameters.date_end_at" class="form-control" type="date" id="date_end_at"/>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group row">
          <label class="col-12 col-form-label" for="time_end_at">Time end</label>
          <div class="col-12">
            <input v-model="conditionResource.parameters.time_end_at" class="form-control" type="time" step="1" id="time_end_at"/>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group row">
          <label class="col-12 col-form-label" :for="`day_of_week-${id}`">Day of week</label>
          <div class="col-12">
            <select v-model="conditionResource.parameters.day_of_week" class="form-control" :id="`day_of_week-${id}`">
              <option :value="null">Any day of week</option>
              <option v-for="(name, key) in dayOfWeekCollection" :value="key">{{ name }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group row">
          <label class="col-12 col-form-label" :for="`timezone-${id}`">Timezone</label>
          <div class="col-12">
            <select v-model="conditionResource.parameters.timezone" :disabled="timezoneCollection.length === 0" class="form-control" :id="`timezone-${id}`">
              <option :value="null">Default timezone</option>
              <option v-for="timezone in timezoneCollection" :value="timezone.code">{{ timezone.code }}</option>
            </select>
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
