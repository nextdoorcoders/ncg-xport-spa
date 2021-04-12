import Vue from 'vue'
import Vuex from 'vuex'

import user from './store/account/user.store'
import contact from './store/account/contact.store'

import account from './store/marketing/account.store'
import campaign from './store/marketing/campaign.store'
import organization from './store/marketing/organization.store'
import project from './store/marketing/project.store'

import condition from './store/trigger/condition.store'
import group from './store/trigger/group.store'
import map from './store/trigger/map.store'
import vendor from './store/trigger/vendor.store'

import location from './store/geo/location.store'
import timezone from './store/geo/timezone.store'

import currency from './store/vendor/currency.store'

import storage from './store/storage.store'

import google from './store/google'

import htmlclass from './store/template/htmlclass.store'
import config from './store/template/config.store'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  modules: {
    account: {
      namespaced: true,
      modules: {
        user,
        contact
      }
    },
    geo: {
      namespaced: true,
      modules: {
        location,
        timezone
      }
    },
    marketing: {
      namespaced: true,
      modules: {
        account,
        campaign,
        organization,
        project
      }
    },
    trigger: {
      namespaced: true,
      modules: {
        condition,
        group,
        map,
        vendor
      }
    },
    vendor: {
      namespaced: true,
      modules: {
        currency
      }
    },
    google,
    storage,
    htmlclass,
    config
  }
})
