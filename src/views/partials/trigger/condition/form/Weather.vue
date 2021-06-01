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
  computed: {
    id: function () {
      return this._uid
    },
  },

  methods: {
    onInput() {
      let delta = this.conditionResource.parameters.delta;
      delta < 0
          ? this.conditionResource.parameters.is_inverted_delta = true
          : this.conditionResource.parameters.is_inverted_delta = false;
    },
    absoluteValue(is_invert) {
      this.setDelta(is_invert,this.conditionResource.parameters.delta)
      this.conditionResource.parameters.is_inverted_delta = false;
    },
    invertValue(is_invert) {
      this.setDelta(is_invert,this.conditionResource.parameters.delta)
    },
    setDelta(is_invert,delta) {
      this.conditionResource.parameters.delta = delta ? is_invert ? delta > 0 ? '-' + delta : delta : Math.abs(delta) : null;
    }
  }
}
</script>

<template>
  <Fragment>
    {{this.conditionResource.parameters}}
    <div class="form-group row">
      <label class="col-3 col-form-label" :for="`min-${id}`">Min value</label>
      <div class="col-9">
        <input v-model="conditionResource.parameters.min" class="form-control" :id="`min-${id}`"/>
      </div>
    </div>
    <div class="form-group row">
      <label class="col-3 col-form-label" :for="`max-${id}`">Max value</label>
      <div class="col-9">
        <input v-model="conditionResource.parameters.max" class="form-control" :id="`max-${id}`"/>
      </div>
    </div>
    <div class="form-group row">
      <label class="col-3 col-form-label" :for="`max-${id}`">Delta</label>
      <div class="col-7">
        <input v-model="conditionResource.parameters.delta" @input="onInput" type="number" class="form-control" :id="`delta-${id}`"/>
        <div class="checkbox-inline">
          <label class="checkbox">
            <input @click="invertValue(!conditionResource.parameters.is_inverted_delta)" v-model="conditionResource.parameters.is_inverted_delta" :id="`is_inverted_delta-${id}`" type="checkbox" name="is_inverted_delta">
            <span></span>
            Invert delta
          </label>
        </div>
      </div>
      <div class="col-2">
        <button @click="absoluteValue(!conditionResource.parameters.is_inverted_delta)" class="btn btn-primary">ABS</button>
      </div>
    </div>
    <div class="form-group row">
      <label class="col-3 col-form-label" :for="`max-${id}`">Time</label>
      <div class="col-9">
        <input v-model="conditionResource.parameters.time" min="0" type="number" class="form-control" :id="`time-${id}`"/>
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
