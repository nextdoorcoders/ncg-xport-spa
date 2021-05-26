<script>
export default {
  name: "ListPlatform",
  props: {
    projectResource: {
      required: true,
      type: Object
    },
    accountCollection: {
      required: true,
      type: Array
    }
  },
  data: () => ({
    optionsForm: {
      active:false,
      platform:null,
    },
    currentPlatform: {
      developer_token:null,
      account_id:null,
    },
    checkedPlatforms: [],
    platforms:[{
      'Google': {
        developer_token:null,
        account_id:null,
      },
      'Facebook': {
        developer_token:null,
        account_id:null,
      },
      'DV360': {
        developer_token:null,
        account_id:null,
      },
      'AdMixer': {
        developer_token:null,
        account_id:null,
      }
    }],
  }),
  methods: {
    editPlatform(platform) {
      let currentPlatform = {};
      this.optionsForm.active = true;
      this.optionsForm.platform = platform;
      this.platforms.filter(item => currentPlatform = item[platform]);
      this.currentPlatform = currentPlatform;

      if(!this.checkedPlatforms.includes(platform)) {
        this.checkedPlatforms.push(platform);
        this.currentPlatform.account_id = null;
        this.currentPlatform.developer_token = null;
      }
    },
    closeWindow() {
      this.optionsForm.active = false;
      this.optionsForm.platform = null;
    },
    updateProject() {
      this.projectResource.platforms = this.platforms
    }
  }
}
</script>

<template>
  <div class="col-12 col-md-6">
    <div class="row">
      <div class="col-md-12" v-if="optionsForm.active">
        <h3 class="font-size-lg text-dark font-weight-bold">Project credentials {{optionsForm.platform}} <i @click="closeWindow()" class="ki ki-close"></i></h3>
        <h4 class="font-size-sm text-muted mb-6">You can change this data in the future,<br/>but this will lead to the <strong>deletion</strong> of all imported digital campaigns</h4>

        <div class="form-group row">
          <label class="col-12 col-md-4 col-form-label" for="account_id">Marketing account</label>
          <div class="col-12 col-md-8">
            <select v-model="projectResource.account_id" :disabled="accountCollection.length === 0" class="form-control" id="account_id">
              <option :value="null">Select account</option>
              <option v-for="account in accountCollection" :value="account.id">{{ account.email }} ({{ account.provider_name }})</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-12 col-md-4 col-form-label" for="parameters.account_id">Account ID</label>
          <div class="col-12 col-md-8">
<!--            <input v-model="projectResource.parameters.account_id" class="form-control" id="parameters.account_id"/>-->
            <input @input="updateProject()" v-model="currentPlatform.account_id" class="form-control" id="parameters.account_id"/>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-12 col-md-4 col-form-label" for="parameters.developer_token">Developer token</label>
          <div class="col-12 col-md-8">
<!--            <input v-model="projectResource.parameters.developer_token" class="form-control" type="password" id="parameters.developer_token"/>-->
            <input @input="updateProject()" v-model="currentPlatform.developer_token"  class="form-control" type="password" id="parameters.developer_token"/>
          </div>
        </div>
      </div>
      <div v-else class="col-md-12">
        <div class="form-group row">
          <div class="col-12 col-md-12">
            <div class="checkbox-inline">
              <label class="checkbox">
                <input v-model="checkedPlatforms" value="Google" type="checkbox">
                <span></span>Google
              </label>
              <i @click="editPlatform('Google')" class="ki ki-gear"></i>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12 col-md-12">
            <div class="checkbox-inline">
              <label class="checkbox">
                <input v-model="checkedPlatforms" value="Facebook" type="checkbox">
                <span></span>Facebook
              </label>
              <i @click="editPlatform('Facebook')" class="ki ki-gear"></i>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12 col-md-12">
            <div class="checkbox-inline">
              <label class="checkbox">
                <input v-model="checkedPlatforms" value="DV360" type="checkbox">
                <span></span>DV360
              </label>
              <i @click="editPlatform('DV360')" class="ki ki-gear"></i>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-12 col-md-12">
            <div class="checkbox-inline">
              <label class="checkbox">
                <input v-model="checkedPlatforms" value="AdMixer" type="checkbox">
                <span></span>AdMixer
              </label>
              <i @click="editPlatform('AdMixer')" class="ki ki-gear"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

