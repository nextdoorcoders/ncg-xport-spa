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
    <div class="row">
      <div class="col-12" :class="{'col-sm-6': conditionResource.vendorType.type === 'compareRank'}">
        <div class="form-group row">
          <label class="col-12 col-form-label" :for="`keyword-${id}`">Search keyword</label>
          <div class="col-12">
            <input v-model="conditionResource.parameters.keyword" class="form-control" :id="`keyword-${id}`"/>
          </div>
        </div>
      </div>
      <div v-if="conditionResource.vendorType.type === 'compareRank'" class="col-12 col-sm-6">
        <div class="form-group row">
          <label class="col-12 col-form-label" :for="`reference_keyword-${id}`">Reference keyword</label>
          <div class="col-12">
            <input v-model="conditionResource.parameters.reference_keyword" class="form-control" :id="`reference_keyword-${id}`"/>
          </div>
        </div>
      </div>
    </div>

    <div v-if="conditionResource.vendorType.type === 'checkRank'" class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group row">
          <label class="col-12 col-form-label" :for="`min_rank-${id}`">Min rank (0 by default)</label>
          <div class="col-12">
            <input v-model="conditionResource.parameters.min_rank" class="form-control" :id="`min_rank-${id}`"/>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group row">
          <label class="col-12 col-form-label" :for="`max_rank-${id}`">Max rank (100 by default)</label>
          <div class="col-12">
            <input v-model="conditionResource.parameters.max_rank" class="form-control" :id="`max_rank-${id}`"/>
          </div>
        </div>
      </div>
    </div>

    <div v-if="conditionResource.vendorType.type === 'compareRank'" class="form-group row">
      <label class="col-12 col-form-label" :for="`rate_type-${id}`">Type of rate</label>
      <div class="col-12">
        <select v-model="conditionResource.parameters.rate_type" class="form-control" :id="`rate_type-${id}`">
          <option value="less">< - search word rank is less than reference word rank</option>
          <option value="equal">= - the search word rank is equal to the reference word rank</option>
          <option value="greater">> - the search word rank is greater than the reference word rank</option>
        </select>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-12 col-form-label" :for="`days_ago-${id}`">The number of days for which to receive statistics</label>
      <div class="col-12">
        <input v-model="conditionResource.parameters.days_ago" class="form-control" :id="`days_ago-${id}`" type="number" min="1" max="365"/>
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
