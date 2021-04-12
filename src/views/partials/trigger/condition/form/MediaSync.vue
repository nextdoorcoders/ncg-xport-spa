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
      selectedFiles: null,
      isSelectedFileUploading: false
    }
  },
  computed: {
    id: function () {
      return this._uid
    },
    hasFile: function () {
      return !_.isEmpty(this.conditionResource.parameters)
    }
  },
  methods: {
    selectFiles() {
      this.selectedFiles = this.$refs.resource.files
    },
    uploadFiles() {
      this.isSelectedFileUploading = true

      this.$store.dispatch('storage/uploadFile', {
        data: {
          field: 'media',
          // fileable_type: 'Condition::class',
          fileable_id: this.conditionResource.id
        },
        file: _.first(this.selectedFiles)
      })
      .then(response => {
        this.isSelectedFileUploading = false

        console.log(response.data)

        this.conditionResource.parameters = response.data
      })
    }
  }
}
</script>

<template>
  <Fragment>
    <div class="form-group row">
      <div v-if="!hasFile" class="col-12 d-flex">
        <div class="custom-file">
          <input @change="selectFiles" ref="resource" :id="`file-${id}`" type="file" accept="video/*" class="custom-file-input" :disabled="isSelectedFileUploading">
          <label v-if="selectedFiles" class="custom-file-label" :for="`file-${id}`">One file selected</label>
          <label v-else class="custom-file-label" :for="`file-${id}`">Choose file</label>
        </div>
        <button v-if="!isSelectedFileUploading" @click="uploadFiles" class="btn btn-success text-nowrap ml-3">Upload media</button>
        <button v-else class="btn btn-success text-nowrap ml-3" disabled>Uploading ...</button>
      </div>
      <div v-else class="col-12 d-flex">
        <video controls="controls" width="100%">
          <source :src="conditionResource.parameters.url" :type="conditionResource.parameters.file_mime_type">
        </video>
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
