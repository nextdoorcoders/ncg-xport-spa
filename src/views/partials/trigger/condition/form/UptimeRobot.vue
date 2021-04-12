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
  },
  data() {
    return {
      monitoringAuthTypes: {
        1: 'HTTP Basic Auth',
        2: 'Digest'
      },
      monitoringHttpMethods: {
        1: 'HEAD',
        2: 'GET',
        3: 'POST',
        4: 'PUT',
        5: 'PATH',
        6: 'DELETE',
        7: 'OPTIONS'
      },
      monitoringPostTypes: {
        0: 'key-value',
        1: 'raw data'
      },
      monitoringPostContentTypes: {
        0: 'text/html',
        1: 'application/json'
      },
      monitoringKeywordTypes: {
        1: 'Exists',
        2: 'Not exists'
      },
      monitoringSubTypes: {
        1: 'HTTP (80)',
        2: 'HTTPS (443)',
        3: 'FTP (21)',
        4: 'SMTP (25)',
        5: 'POP3 (110)',
        6: 'IMAP (143)',
        99: 'Custom Port'
      }
    }
  }
}
</script>

<template>
  <Fragment>
    <div class="row">
      <div class="col-12">
        <p>See full docs here: <a href="https://uptimerobot.com/api/" target="_blank">UptimeRobot</a></p>
      </div>

      <div class="col-12 col-sm-12">
        <div class="form-group row">
          <label class="col-12 col-form-label" for="friendly_name">Friendly name</label>
          <div class="col-12">
            <input v-model="conditionResource.parameters.settings.friendly_name" class="form-control" id="friendly_name"/>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group row">
          <label class="col-12 col-form-label" for="url">URL</label>
          <div class="col-12">
            <input v-model="conditionResource.parameters.settings.url" class="form-control" id="url"/>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group row">
          <label class="col-12 col-form-label" for="interval">Interval, sec.</label>
          <div class="col-12">
            <input v-model="conditionResource.parameters.settings.interval" class="form-control" id="interval"/>
          </div>
        </div>
      </div>
    </div>

    <div v-if="conditionResource.vendorType.type === 'http' || conditionResource.vendorType.type === 'keyword'" class="row">
      <div class="col-12 col-sm-4">
        <div class="form-group row">
          <label class="col-12 col-form-label" for="http_username">Username</label>
          <div class="col-12">
            <input v-model="conditionResource.parameters.settings.http_username" class="form-control" id="http_username"/>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-4">
        <div class="form-group row">
          <label class="col-12 col-form-label" for="http_password">Password</label>
          <div class="col-12">
            <input v-model="conditionResource.parameters.settings.http_password" class="form-control" id="http_password"/>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-4">
        <div class="form-group row">
          <label class="col-12 col-form-label" for="http_auth_type">Auth type</label>
          <div class="col-12">
            <select v-model="conditionResource.parameters.settings.http_auth_type" class="form-control" id="http_auth_type">
              <option v-for="(name, id) in monitoringAuthTypes" :value="id">{{ name }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-12">
        <div class="form-group row">
          <label class="col-12 col-form-label" for="http_method">HTTP method</label>
          <div class="col-12">
            <select v-model="conditionResource.parameters.settings.http_method" class="form-control" id="http_method">
              <option v-for="(name, id) in monitoringHttpMethods" :value="id">{{ name }}</option>
            </select>
          </div>
        </div>
      </div>

      <template v-if="conditionResource.parameters.settings.http_method != '1' && conditionResource.parameters.settings.http_method != '2'">
        <div class="col-12 col-sm-6">
          <div class="form-group row">
            <label class="col-12 col-form-label" for="post_type">Post type</label>
            <div class="col-12">
              <select v-model="conditionResource.parameters.settings.post_type" class="form-control" id="post_type">
                <option v-for="(name, id) in monitoringPostTypes" :value="id">{{ name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="form-group row">
            <label class="col-12 col-form-label" for="post_content_type">Post content type</label>
            <div class="col-12">
              <select v-model="conditionResource.parameters.settings.post_content_type" class="form-control" id="post_content_type">
                <option v-for="(name, id) in monitoringPostContentTypes" :value="id">{{ name }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group row">
            <label class="col-12 col-form-label" for="post_value">Post value (json)</label>
            <div class="col-12">
              <textarea v-model="conditionResource.parameters.settings.post_value" class="form-control" id="post_value"/>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div v-if="conditionResource.vendorType.type === 'keyword'" class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group row">
          <label class="col-12 col-form-label" for="keyword_type">Keyword type</label>
          <div class="col-12">
            <select v-model="conditionResource.parameters.settings.keyword_type" class="form-control" id="keyword_type">
              <option v-for="(name, id) in monitoringKeywordTypes" :value="id">{{ name }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group row">
          <label class="col-12 col-form-label" for="keyword_value">Keyword value</label>
          <div class="col-12">
            <input v-model="conditionResource.parameters.settings.keyword_value" class="form-control" id="keyword_value"/>
          </div>
        </div>
      </div>
    </div>

    <div v-if="conditionResource.vendorType.type === 'port'" class="row">
      <div class="col-12 col-sm-6">
        <div class="form-group row">
          <label class="col-12 col-form-label" for="sub_type">Port monitoring</label>
          <div class="col-12">
            <select v-model="conditionResource.parameters.settings.sub_type" class="form-control" id="sub_type">
              <option v-for="(name, key) in monitoringSubTypes" :value="key">{{ name }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group row">
          <label class="col-12 col-form-label" for="port">Custom port</label>
          <div class="col-12">
            <input v-model="conditionResource.parameters.settings.port" class="form-control" id="port" :disabled="conditionResource.parameters.settings.sub_type !== '99'"/>
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
