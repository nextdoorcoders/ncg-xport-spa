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
    }
  }
}
</script>

<template>
  <Fragment>
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
